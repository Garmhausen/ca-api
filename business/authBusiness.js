const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const { makeSlimUser } = require('./userBusiness');
const { authService, userService } = require('../service');
const { transport, craftEmail } = require('../mail');

const sessionDuration = process.env.SESSION_DURATION;

const startSession = async (userId) => {
  console.log('attempting to start session...');
  const newSession = await authService.createSession({
    active: true,
    expireOn: new Date(parseFloat(Date.now()) + parseFloat(sessionDuration))
  }, userId);
  console.log('newSession', newSession);
  const token = jwt.sign(newSession.id, process.env.TOKEN_SECRET);

  return token;
};

const refreshSession = async (token) => {
  let success = false;

  if (token) {
    const sessionId = jwt.verify(token, process.env.TOKEN_SECRET);
    const { active, expireOn } = await authService.getSession(sessionId);

    if (active && Date.parse(expireOn) > Date.now()) {
      authService.updateSession(sessionId, {
        expireOn: new Date(parseFloat(Date.now()) + parseFloat(sessionDuration))
      });
      success = true;
    } else {
      authService.endSession(sessionId);
    }
  }

  return success;
};

const endSession = (token) => {
  if (token) {
    const sessionId = jwt.verify(token, process.env.TOKEN_SECRET);
    authService.updateSession(sessionId, {
      active: false
    });
  }
};

const getUserFromValidSession = async (sessionToken) => {
  if (sessionToken) {
    try {
      const sessionId = jwt.verify(sessionToken, process.env.TOKEN_SECRET);
      const { active, expireOn, user } = await authService.getSession(sessionId);

      if (!active || expireOn < Date.now()) {
        if (active) {
          endSession(sessionToken);
        }
        throw new Error('Session has expired');
      }

      refreshSession(sessionToken);

      return user;
    } catch (error) {
      console.log('error', error);  // TODO: better error handling
    };
  }

  return null
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
  refreshSession,
  endSession,
  getUserFromValidSession,
  userSignUp,
  signin,
  requestPasswordReset,
  resetPassword
};
