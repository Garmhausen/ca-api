const express = require('express');
const router = express.Router();
const { clientsGridDefault, verifyLoggedIn } = require('../utils');
const { clientBusiness } = require('../business');

// all routes in this file begin with /clients

// all routes below require login
router.use(( req, res, next) => verifyLoggedIn(req, res, next));

router.use(express.json()); // requiredk for parsing json body in request

// GET /clients
router.get('/', async function(req, res) {
  console.log('GET /clients');
  console.log('query params:', req.query);

  const pageProperties = {
    page: req.query.page ? Number.parseInt(req.query.page) : clientsGridDefault.page,
    pagesize: req.query.pagesize ? Number.parseInt(req.query.pagesize) : clientsGridDefault.pagesize,
    sortby: req.query.sortby ? req.query.sortby : clientsGridDefault.sortby
  };

  let response;

  try {
    const clients = await clientBusiness.getClients(pageProperties, req.userId, req.user);

    response = {
      data: {
        clients
      }
    }
  } catch (error) {
    console.log('there was an error:', error);
    res.status = 400; // Bad Request
    response = ('Unable to fetch clients');
  }

  res.send(response);
})

module.exports = router;