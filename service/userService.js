const { query } = require('../resolvers');

const getUserById = async (userId) => {
  const user = await query
    .retrieveUser(userId)
    .$fragment(`{
            id
            name
            email
            permissions
        }`)
    .catch((err) => {
      console.log('error', err); // TODO: better error handling
    });
    
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
