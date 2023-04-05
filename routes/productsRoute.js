const express = require("express");
const router = express.Router();
/* const path = require('path'); 
const multer = require('multer'); */
const productsController = require('../controllers/productsController');

/******* Middlewares ********/
const uploadFile = require('../middlewares/productsMulterMiddleware');


/******* CRUD  *******/
/*router.get( "/", productsController.index );*/
router.get( "/", productsController.listadoPoductos);
router.get( "/crear", productsController.crearProducto );
router.post( "/crear", productsController.guardarProducto);
/*router.get('/:id' , productsController.detail); */
router.get('/:id' , productsController.detalleProducto); 

/*
router.post('/', 
     uploadFile.fields([
        { name: 'file_img', maxCount: 1 },
        { name: 'files_img', maxCount: 4 }]),
     productsController.store);*/

router.get('/:id/editar' , productsController.edit);

router.post('/:id/editar' , productsController.actualizar);

router.post('/:id' , productsController.borrarProducto); 


/*router.put('/:id' , uploadFile.fields([
                { name: 'file_img', maxCount: 1 },
                { name: 'files_img', maxCount: 4 }]),
                productsController.update);*/

//router.delete('/:id' , productsController.delete); 


module.exports = router; 