const express = require('express');
const router = express.Router();

router.use('/', require('./base'));
router.use('/account', require('./account'));
router.use('/user', require('./user'));
router.use('/users', require('./users'));
router.use('/client', require('./client'));
router.use('/clients', require('./clients'));

module.exports = router;
