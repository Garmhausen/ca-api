import { userService } from '../service';
import { hasPermission } from '../utils';

const getUserById = async (userId, requestingUser) => {
  const isGettingSelf = userId === requestingUser.id;
  if (!isGettingSelf) {
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

const updateUser = async (userId, updates, requestingUser) => {
  const isUpdatingSelf = (userId === requestingUser.id);
  if (!isUpdatingSelf) {
    hasPermission(requestingUser, ['ADMIN']);
  }

  const user = userService.updateUser(userId, updates).$fragment(slimUserFragment);

  return user;
}

const deleteUser = async (userId, requestingUser) => {
  const isDeletingSelf = userId === requestingUser.id;
  
  if (!isDeletingSelf) {
    hasPermission(requestingUser, ['ADMIN']);
  }

  const user = await userService.deleteUser(userId);

  return user;
};

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

export default {
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  makeSlimUser,
  slimUserFragment
};
