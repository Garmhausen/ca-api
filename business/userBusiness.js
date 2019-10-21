const { userService } = require('../service');
const { hasPermission } = require('../utils');

const getUserById = async (userId, requestingUser) => {
  if (userId !== requestingUser.id) {
    hasPermission(requestingUser, ['ADMIN']);
  }

  const user = await userService.getUserById(userId);

  return user;
}

const getUserByEmail = async (email) => {
  const user = await userService.getUserByEmail(email).$fragment(slimUserFragment);

  return user;
}

const getAllUsers = async (requestingUser) => {
  hasPermission(requestingUser, ['ADMIN']);
  const users = await userService.getAllUsers().$fragment(slimUserFragment);

  return users;
}

const updateUser = async (userId, updates, isUpdatingSelf = false) => {
  if (!updatingSelf) {
    hasPermission(userId, ['ADMIN']);
  }

  const user = userService.updateUser(userId, updates).$fragment(slimUserFragment);

  return user;
}

const makeSlimUser = (user) => {
  const slimUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    permissions: user.permissions
  };

  return slimUser;
}

const slimUserFragment = `
  {
    id
    name
    email
    permissions
  }
`;

module.exports = {
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  makeSlimUser,
  slimUserFragment
};
