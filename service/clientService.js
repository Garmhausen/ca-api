const { query, mutation } = require('../resolvers');

const getClientById = (clientId) => {
  const client = query.retrieveClient(clientId);

  return client;
}

const getClientsByUserId = (userId) => {
  const clients = query.getClientsByUserId(userId);

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

module.exports =  {
  getClientById,
  getClientsByUserId,
  getAllClients,
  createClient,
  updateClient,
  deleteClient
}
