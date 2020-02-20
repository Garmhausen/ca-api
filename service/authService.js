const { mutation, query } = require('../resolvers');

const getSession = async (sessionId) => {
  const session = await query.retrieveSession(sessionId);

  return session;
}

const getSessionWithUser = async (sessionId) => {
  const sessionWithUser = await query.retrieveSession(sessionId).$fragment(`
    {
      id
      active
      expireOn
      user {
        id
        permissions
        email
        name
      }
    }
  `);

  return sessionWithUser;
}

const createSession = async (sessionData, userId) => {
  const session = await mutation.createSession({
    ...sessionData,
    user: {
      connect: {
        id: userId
      }
    }
  });

  return session;
}

const updateSession = async (sessionId, updates) => {
  const session = mutation.updateSession(sessionId, updates);

  return session;
}

const signup = async (args) => {
  const user = await mutation.signup(args);

  return user;
}

module.exports = {
  getSession,
  getSessionWithUser,
  createSession,
  updateSession,
  signup
};
