const express = require('express');
const authController = require('../controllers/userController');

const router = express.Router();

router.post('/sign-up', authController.handleSignUp);
router.post('/sign-in', authController.handleSignIn);

module.exports = router;