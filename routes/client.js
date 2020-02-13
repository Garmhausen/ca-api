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

    response = {
      authToken: authBusiness.createToken(req.userId),
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

module.exports = router;