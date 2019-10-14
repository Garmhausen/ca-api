const { userService } = require('../service');

const getUserById = async (userId) => {
  const user = await userService.getUserById(userId);

  return user;
}

const getUserByEmail = async (email) => {
  const user = await userService.getUserByEmail(email);

  return user;
}

const makeSlimUser = (user) => {
  const slimUser = {
    name: user.name,
    email: user.email,
    permissions: user.permissions
  };

  return slimUser;
}

module.exports = {
  getUserById,
  getUserByEmail,
  makeSlimUser
};
