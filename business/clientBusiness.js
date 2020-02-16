const { clientService } = require('../service');
const { hasPermission } = require('../utils');

const createClient = (clientData, userId) => {
  const client = clientService.createClient(clientData, userId);

  return client;
}

const deleteClient = async (clientId, requestingUser) => {
  const ownsClient = await clientService.verifyClientOwnership(clientId, requestingUser.id);

  if (!ownsClient) {
    hasPermission(requestingUser, ['ADMIN']);
  }

  const client = clientService.deleteClient(clientId);

  return client;
}

module.exports = {
  createClient,
  deleteClient
}
