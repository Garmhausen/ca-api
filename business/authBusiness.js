const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const { makeSlimUser } = require('./userBusiness');
const { authService, userService } = require('../service');
const { transport, craftEmail } = require('../mail');

const createToken = (userId) => {
  const token = {
    userId,
    expiration: Date.now() + (1000 * 60 * 60 * 24 * 14) // 14 days from now
  }

  return jwt.sign(token, process.env.TOKEN_SECRET);
};

const getUserIdFromValidToken = (authToken) => {
  if (authToken) {
    try {
      const { userId, expiration } = jwt.verify(authToken, process.env.TOKEN_SECRET);

      if (expiration >= Date.now()) {
        return userId;
      }
      
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
    resetURL,
    mailResult
  };
}

module.exports = {
  createToken,
  getUserIdFromValidToken,
  userSignUp,
  signin,
  requestPasswordReset
};
