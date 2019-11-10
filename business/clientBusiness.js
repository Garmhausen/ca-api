const { clientService } = require('../service');

const createClient = (clientData, userId) => {
  const client = clientService.createClient(clientData, userId);

  return client;
}

module.exports = {
  createClient,
}
