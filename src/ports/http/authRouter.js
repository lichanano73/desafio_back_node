const express = require('express');
const router  = express.Router();
const auth_controller = require('../../adapters/controllers/authController');

router.post('/login', auth_controller.loginUser);
router.post('/register', auth_controller.addUser);

module.exports = router;