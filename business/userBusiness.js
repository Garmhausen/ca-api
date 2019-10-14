const { userService } = require('../service');

const getUserById = (userId) => {
  const user = userService.getUserById(userId);

  return user;
}

module.exports = {
  getUserById
};
