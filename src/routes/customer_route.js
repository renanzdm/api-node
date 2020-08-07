'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/customer_controller');
const authService = require('../services/auth_services');


router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token',authService.authorize, controller.refreshToken);

module.exports = router;