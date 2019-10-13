const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  const token = {
    userId,
    expiration: Date.now() + (1000 * 60 * 60 * 24 * 14) // 14 days from now
  }

  return jwt.sign(token, process.env.TOKEN_SECRET);
};

module.exports = {
  createToken
};
