const express = require("express");
const router = express.Router();
const userController = require('../controllers/usersController');

router.get("/",  userController.login);

module.exports = router; 