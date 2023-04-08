const express = require("express");
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get( "/",  mainController.carrito );
router.post('/:idProduct' , mainController.addProduct)

module.exports = router;