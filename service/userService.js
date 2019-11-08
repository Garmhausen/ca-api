import { query, mutation } from '../resolvers';

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

const deleteUser = (userId) => {
  const user = mutation.deleteUser(userId);

  return user;
}

const getUserByResetToken = async (resetToken) => {
  const [user] = await query.retrieveUserByResetToken(resetToken);

  return user || null;
}

export default {
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByResetToken
};
