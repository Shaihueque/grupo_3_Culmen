const express = require("express");
const router = express.Router();
const path = require('path'); 
const multer = require('multer');
//const mainController = require('../controllers/mainController')
const userController = require('../controllers/userController')

const multerStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        const ruta = path.join(__dirname , "../public/users");
        callBack( null , ruta ); 
    },
     
    filename: (req, file, callBack) => {
    const newFilename = 'img-' + Date.now() + path.extname(file.originalname);
    callBack( null , newFilename )}
    }); 

    const upload = multer({ storage: multerStorage }); 


router.get( "/",  userController.login);
router.post("/", upload.single('imagenUsuario'), userController.create )



module.exports = router; 