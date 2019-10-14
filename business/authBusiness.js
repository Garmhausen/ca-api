const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { authService } = require('../service');
const userBusiness = require('./userBusiness');

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

  return user;
}

const signin = async (email, password) => {
  const user = await userBusiness.getUserByEmail(email);

  if (!user) {
    throw new Error(`No user found for email ${email}.`);
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error(`Invalid password!`);
  }

  return user;
}

module.exports = {
  createToken,
  getUserIdFromValidToken,
  userSignUp,
  signin
};
