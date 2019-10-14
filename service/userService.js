const { query, mutation } = require('../resolvers');

const getUserById = (userId) => {
  const user = query.retrieveUser(userId);
    
  return user;
}

const getUserByEmail = (email) => {
  const user = query.retrieveUserByEmail(email);

  return user;
}

const getAllUsers = () => {
  const users = query.retrieveUsers();

  return users;
}

const updateUser = (userId, updates) => {
  const user = mutation.updateUser(userId, updates);

  return user;
}

module.exports = {
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser
};
