const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const { makeSlimUser } = require('./userBusiness');
const { authService, userService } = require('../service');
const { transport, craftEmail } = require('../mail');

const sessionDuration = process.env.SESSION_DURATION;

const startSession = async (userId) => {
  const session = await authService.createSession({
      active: true,
      expireOn: new Date(Date.now() + parseFloat(sessionDuration))
    }, userId);
  const token = jwt.sign(session.id, process.env.TOKEN_SECRET);

  return token;
};

const endSession = (sessionId) => {
  if (!sessionId) {
    throw new Error('Must provide non-null sessionId');
  }
  
  authService.updateSession(sessionId, {
    active: false
  });
};

const checkSession = async (sessionId) => {
  let success = false;

  if (!sessionId) {
    throw new Error('Must provide non-null sessionId');
  }

  const session = await authService.getSession(sessionId);

  if (!session) {
    throw new Error('No session found!');
  }

  const {active, expireOn } = session;

  if (active && Date.parse(expireOn) > Date.now()) {
    refreshSession(sessionId)
    success = true;
  }

  return success;
}

const refreshSession = async (sessionId) => {
  authService.updateSession(sessionId, {
    expireOn: new Date(Date.now() + parseFloat(sessionDuration))
  });
}

const getUserBySessionId = async (sessionId) => {
  const session = await authService.getSessionWithUser(sessionId);

  if (!session) {
    throw new Error('No session for for given sessionId', sessionId);
  }

  return makeSlimUser(session.user);
}

const userSignUp = async (args) => {
  args.email = args.email.toLowerCase();  // lowercase all emails going into the db
  const password = await bcrypt.hash(args.password, 10);
  const newUser = {
    name: args.name || '',
    email: args.email,
    password,
    permissions: { set: ['USER'] }
  }
  const user = await authService.signup(newUser);

  return makeSlimUser(user);
}

const signin = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new Error(`No user found for email ${email}.`);
  }
  
  const valid = await bcrypt.compare(password, user.password);
  
  if (!valid) {
    throw new Error(`Invalid password!`);
  }

  return makeSlimUser(user);
}

const requestPasswordReset = async (email) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new Error(`No user found for email ${email}.`);
  }

  const randomBytesPromisified = promisify(randomBytes);
  const resetToken = (await randomBytesPromisified(20)).toString('hex');
  const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration

  const updatedUser = await userService.updateUser(user.id, { resetToken, resetTokenExpiration });
  const updatedSlimUser = makeSlimUser(updatedUser);
  delete updatedSlimUser.id;
  delete updatedSlimUser.name;
  delete updatedSlimUser.permissions;

  const resetURL = `${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`;

  const mailResult = await transport.sendMail({
    from: 'admin@admin.admin',
    to: user.email,
    subject: 'Password Reset Link',
    html: craftEmail(`
            Your password reset link is here!\n
            \n
            <a href="${resetURL}">Click here to reset</a>
        `)
  });

  return {
    ...updatedSlimUser,
    mailResult
  };
}

const resetPassword = async (resetToken, newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match!');
  }

  const user = await userService.getUserByResetToken(resetToken);

  if (!user) {
    throw new Error('This token is invalid or expired!');
  }

  const password = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userService.updateUser(user.id, {
    password,
    resetToken: null,
    resetTokenExpiration: null
  });

  const updatedSlimUser = makeSlimUser(updatedUser);

  return updatedSlimUser;
};

module.exports = {
  startSession,
  endSession,
  checkSession,
  refreshSession,
  getUserBySessionId,
  userSignUp,
  signin,
  requestPasswordReset,
  resetPassword
};
