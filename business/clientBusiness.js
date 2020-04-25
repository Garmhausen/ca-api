const { clientService } = require('../service');
const { hasPermission, calculatePageInfo } = require('../utils');

const createClient = (clientData, userId) => {
  const client = clientService.createClient(clientData, userId);

  return client;
}

const getClients = async (pageProperties, userId, requestingUser) => {
  if (userId != requestingUser.id) {
    hasPermission(requestingUser, ['ADMIN']);
  }

  const total = await clientService.getClientCountByUserId(userId);
  const totalPages = Math.ceil(total / pageProperties.pagesize);

  if (totalPages < pageProperties.page + 1) {
    pageProperties.page = totalPages - 1;
  }
  
  if (pageProperties.page < 0) {
    pageProperties.page = 0;
  }

  const clients = await clientService.getClientsByUserIdPaged(userId, pageProperties);
  const page = calculatePageInfo(pageProperties, total);

  const result = {
    clients,
    total,
    page
  }

  return result;
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
  getClients,
  deleteClient
}
