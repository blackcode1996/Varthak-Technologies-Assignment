const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Route for user registration
router.post('/register', userController.registerUser);
// Route for user login
router.post('/login', userController.loginUser)
// Route for user to update roles
router.post('/updateroles',userController.updateRoles)

module.exports = router;
