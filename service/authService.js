const { mutation } = require('../resolvers');

const signup = async (args) => {
  const user = await mutation.signup(args);

  return user;
}

module.exports = {
  signup
};
