const express = require('express');
const router = express.Router();

const { register, login, me, changePassword } = require('../controller/admin.controller');
const { protect } = require('../middleWare/admin.middleware');

router.post('/register', register);

router.post('/login', login);

router.get('/me', protect, me);

router.put('/c-password', changePassword);

module.exports = router;
