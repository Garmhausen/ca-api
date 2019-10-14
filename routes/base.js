const express = require('express');
const router = express.Router();

const { authBusiness } = require('../business');

// all routes in this file begin with /

// GET /heartbeat
router.get('/heartbeat', function (req, res) {
  console.log('GET /heartbeat'); // TODO: replace with actual logging

  const response = {
    name: 'tbd', // TODO: come up with a name for this thing
    vitals: {
      // add vitals for prisma and postgres services
    }
  }

  res.json(response);
});

// GET /me
router.get('/me', async function (req, res) {
  console.log('GET /me');

  if (!req.user) {
    return res.status(400).json("Not logged in");
  }

  const authToken = authBusiness.createToken(req.userId);
  const user = {
    name: req.user.name,
    email: req.user.email,
    permissions: req.user.permissions
  };
  
  const response = {
    authToken,
    user
  };

  res.json(response);
});

module.exports = router;
