const express = require('express');
const router = express.Router();

// MAIN APP ROUTES -- WILL BE PREFIXED BY /api
const searchRouter = require('./search');
router.use('/search', searchRouter);
const pingRouter = require('./ping');
router.use('/ping', pingRouter);
const listRouter = require('./list');
router.use('/list', listRouter);
module.exports = router;
