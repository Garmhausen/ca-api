const { query } = require('../resolvers');

const getUserById = async (userId) => {
  const user = await query.retrieveUser(userId);
    
  return user;
}

const getUserByEmail = async (email) => {
  const user = await query.retrieveUserByEmail(email);

  return user;
}

module.exports = {
  getUserById,
  getUserByEmail
};
