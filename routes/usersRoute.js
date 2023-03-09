//Requerimos express y path
const express = require("express");
const router = express.Router();
const path = require('path'); 
const multer = require('multer');
//const mainController = require('../controllers/mainController')
//----------CONTROLLERS---------
const userController = require('../controllers/userController')

/*const multerStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        const ruta = path.join(__dirname , "../public/users");
        callBack( null , ruta ); 
    },
     
    filename: (req, file, callBack) => {
    const newFilename = 'img-' + Date.now() + path.extname(file.originalname);
    callBack( null , newFilename )}
    }); 

    const upload = multer({ storage: multerStorage }); 
*/
//--------MIDDLEWARES--------
const uploadFileUser = require('../middlewares/usersMulterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware'); 
const authMiddleware = require('../middlewares/authMiddleware');
const validateLogin = require('../middlewares/validationUserLogin');
const validateRegister = require('../middlewares/validationUserRegister');

router.get( "/login", guestMiddleware, userController.login);
//Proceso de login de ingreso de usuarios registrados
router.post('/login', validateLogin, userController.processLogin);
//Proceso de registro de los nuevos usuarios
router.post("/", uploadFileUser.single('imagenUsuario'),validateRegister, userController.processRegister );
//ACCEDER AL PERFIL DEL USUARIO
router.get("/profile", authMiddleware, userController.profile);

router.get("/logout", userController.logout);

module.exports = router; 