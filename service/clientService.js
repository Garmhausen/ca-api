const { query, mutation } = require('../resolvers');

const getClientById = (clientId) => {
  const client = query.retrieveClient(clientId);

  return client;
}

const getClientsByUserId = (userId) => {
  const clients = query.retrieveClientsByUserId(userId);

  return clients;
}

const getClientCountByUserId = (userId) => {
  const clientCount = query.retrieveClientsCountByUserId(userId);

  return clientCount;
}

const getClientsByUserIdPaged = (userId, pageProperties) => {
  const clients = query.retrieveClientsByUserIdPaged(userId, pageProperties);

  return clients;
}

const getAllClients = () => {
  const clients = query.retrieveClients();

  return clients;
}

const createClient = (clientData, userId) => {
  const client = mutation.createClient({
    ...clientData,
    user: {
      connect: {
        id: userId
      }
    }
  });

  return client;
}

const updateClient = (clientId, updates) => {
  const client = mutation.updateClient(clientId, updates);

  return client;
}

const deleteClient = (clientId) => {
  const client = mutation.deleteClient(clientId);

  return client;
}

const verifyClientOwnership = async (clientId, userId) => {
  const client = await query.retrieveClientByClientIdAndUserId(clientId, userId);

  return client.length > 0;
}

module.exports =  {
  getClientById,
  getClientsByUserId,
  getClientCountByUserId,
  getClientsByUserIdPaged,
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  verifyClientOwnership
}
