const { clientService } = require('../service');
const { hasPermission } = require('../utils');

const createClient = (clientData, userId) => {
  const client = clientService.createClient(clientData, userId);

  return client;
}

const deleteClient = async (clientId, requestingUserId) => {
  const ownsClient = await clientService.verifyClientOwnership(clientId, requestingUserId);

  if (!ownsClient) {
    hasPermission(requestingUserId, ['ADMIN']);
  }

  const client = clientService.deleteClient(clientId);

  return client;
}

module.exports = {
  createClient,
  deleteClient
}
