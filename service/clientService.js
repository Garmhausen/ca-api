import { query, mutation } from '../resolvers';

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

const updateClient = (clientId, updates) => {
  const client = mutation.updateClient(clientId, updates);

  return client;
}

const deleteClient = (clientId) => {
  const client = mutation.deleteClient(clientId);

  return client;
}

export default {
  getClientById,
  getClientsByUserId,
  getAllClients,
  updateClient,
  deleteClient
}