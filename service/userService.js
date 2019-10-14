const { prisma } = require('../prisma');

const getUserById = async (userId) => {
  const user = await prisma
    .user({ id: userId })
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

module.exports = {
  getUserById
};
