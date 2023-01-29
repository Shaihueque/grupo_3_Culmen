const express = require("express");
const router = express.Router();
const path = require('path'); 
const multer = require('multer');
const productsController = require('../controllers/productsController');

/****** CONFIGURANDO MULTER *******/

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

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

const upload = multer({ storage , fileFilter }); 

router.get( "/", productsController.index );
router.get( "/crear", productsController.crearProducto );
router.get('/:id' , productsController.detail); 

router.post('/', 
     upload.fields([
        { name: 'file_img', maxCount: 1 },
        { name: 'files_img', maxCount: 4 }]),
     productsController.store);
 
/* router.post('/', upload.array('files_img', 4)  , productsController.store); */
/* router.post('/',  upload.single('file_img')  , productsController.store); */

router.get('/:id/editar' , productsController.edit);

router.put('/:id' , upload.fields([
                { name: 'file_img', maxCount: 1 },
                { name: 'files_img', maxCount: 4 }]),
                productsController.update);

router.delete('/:id' , productsController.delete); 


module.exports = router; 