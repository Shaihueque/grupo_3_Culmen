const express = require("express");
const router = express.Router();
const path = require('path'); 
const multer = require('multer');
const productsController = require('../controllers/productsController');

/****** CONFIGURANDO MULTER *******/
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const ruta = path.join(__dirname , "../public/products");
        cb( null , ruta ); 
    }, 
    filename: (req, file, cb)=>{
        const newFilename = 'img-' + Date.now() + path.extname(file.originalname);
        cb( null , newFilename ); 
    }
}); 

const upload = multer({storage}); 




router.get( "/", productsController.index );
router.get( "/crear", productsController.crearProducto );
router.get('/:id' , productsController.detail); 
router.post('/', upload.single('file_img') ,productsController.store);
router.get('/:id/editar' , productsController.edit);
router.put('/:id' , upload.single('file_img') ,productsController.update);
router.delete('/:id' , productsController.delete); 


module.exports = router; 