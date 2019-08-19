const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.patch('/update/password', AuthController.update_password);
router.post('/login', AuthController.login);
router.put('/account/update', AuthController.update_account);

module.exports = router;