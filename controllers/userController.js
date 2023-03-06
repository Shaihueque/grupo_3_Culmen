const path = require('path'); 
const fs = require('fs'); 
const UserModels = require('../models/UserModels');
const bcryptjs = require('bcryptjs')


const userDataJSON = fs.readFileSync(path.join(__dirname , '../data/userData.json') , 'utf-8');
let userData = JSON.parse(userDataJSON); 

const userController = {
    login: (req, res)=>{
        res.render('users/login')
    },
    
    create: function(req,res) {
        const nuevoUsuario = {
            ...req.body , 
            password: bcryptjs.hashSync(req.body.pass, 10),
            imagen: req.file ? req.file.filename : 'ImagenUsuario.png'
        }
        
    UserModels.create(nuevoUsuario)
    res.redirect("/")},
}

module.exports = userController