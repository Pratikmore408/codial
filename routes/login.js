const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login_controller');


router.get('/signup', loginController.signup);

module.exports = router;