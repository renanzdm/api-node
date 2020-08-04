'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/order_controller');
const authService = require('../services/auth_services');


router.post('/',authService.authorize, controller.post);
router.get('/',authService.authorize, controller.get);

module.exports = router;