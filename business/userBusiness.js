const { userService } = require('../service');

const getUserById = async (userId) => {
  const user = await userService.getUserById(userId);

  return user;
}

module.exports = {
  getUserById
};
