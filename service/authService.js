import { mutation } from '../resolvers';

const signup = async (args) => {
  const user = await mutation.signup(args);

  return user;
}

export default {
  signup
};
