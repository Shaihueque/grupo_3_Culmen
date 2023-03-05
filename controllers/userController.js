const path = require('path'); 
const fs = require('fs'); 

const userDataJSON = fs.readFileSync(path.join(__dirname , '../data/userData.json') , 'utf-8');
let userData = JSON.parse(userDataJSON); 

const userController = {
    create: function(req, res) {
       let usuario= {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        pass: req.body.pass,
        passConfirm: req.body.passConfirm,
        imagenUsuario: req.body.imagenUsuario,
        fechaNac: req.body.fechaNac
       }
       res.redirect("/")
    },

    userNuevo: (req, res)=>{

        const nuevoId = userData ? userData[userData.length - 1].id + 1 : 0 ;
        
        const image = req.files.file_img[0].filename ? req.files.file_img[0].filename : 'ImagenUsuario.png';
        

        const nuevoUsuario = {
            id: nuevoId , 
            ...req.body , 
            imagen: image, 
        }

        userData.push(nuevoUsuario);
        fs.writeFileSync( path.join(__dirname , '../data/userData.JSON') , JSON.stringify(userData, null, 2) )
        res.redirect('/')
    }, 
}

module.exports = userController