const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get( "/crearProducto", adminController.crearProducto  );
router.get( "/editarProducto",  adminController.editarproducto );

module.exports = router; 