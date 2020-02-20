const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');

const { handleError, verifyLoggedIn } = require('../utils');
const { authBusiness, clientBusiness } = require('../business');
const { validationHelper } = require('../helpers');

// all routes in this file begin with /client

// all routes below require login
router.use((req, res, next) => verifyLoggedIn(req, res, next));

router.use(express.json()); // required for parsing json body in request

// POST /client
router.post('/', validationHelper.createClientValidation, async function(req, res) {
  console.log('POST /client');

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ errors: validationErrors.array() });
  }

  let response;

  try {
    const client = await clientBusiness.createClient(req.body, req.userId);
    res.status(201);  // created
    response = {
      data: {
        client
      }
    }
  } catch (error) {
    response = handleError(error);
    res.status(400); // bad request
  }

  res.json(response);
})

// DELETE /client/:id
router.delete('/:id', async function(req, res) {
  console.log(`DELETE /client/${req.params.id}`);
  let response;

  try {
    const client = await clientBusiness.deleteClient(req.params.id, req.user);

    response = {
      data: {
        client
      }
    }
  } catch (error) {
    handleError(error);
    response = "Unable to delete client.";
    res.status(400); // bad request
  }

  res.json(response);
});

module.exports = router;
