const jwt = require('jsonwebtoken');

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

module.exports = {
  createToken,
  getUserIdFromValidToken
};
