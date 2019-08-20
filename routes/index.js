const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
// router.patch('/update/password', AuthController.update_password);
// router.put('/account/update', AuthController.update_account);
// router.post('/verify', AuthController.verify_token);

module.exports = router;