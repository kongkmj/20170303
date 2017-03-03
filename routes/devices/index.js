const express = require('express');
const router = express.Router();
const controller = require('./devices.controller');

router.get('/doorlock',controller.doorlock);
router.get('/light',controller.light);

module.exports = router;
