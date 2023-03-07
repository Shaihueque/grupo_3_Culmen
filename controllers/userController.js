const path = require('path'); 
const fs = require('fs'); 
const UserModels = require('../models/UserModels');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


const userDataJSON = fs.readFileSync(path.join(__dirname , '../data/userData.json') , 'utf-8');
let userData = JSON.parse(userDataJSON); 

const userController = {
    login: (req, res)=>{
        res.render('users/login')
    },
    
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        //Verificamos si el usuario existe en la base de datos, si existe es porque el mail ya esta registrado
        let userInDB = user.findByField('email', req.body.email);

        if(userInDB) {
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }
//Si no llega a estar registrado, se prepara la info siguiente para enviar
        let userToCreate = {
            ...req.body , 
            password: bcryptjs.hashSync(req.body.password, 10),
            passConfirm: bcryptjs.hashSync(req.body.passConfirm , 10),
            imagen: req.file ? req.file.filename : 'ImagenUsuario.png'
        };
        
        let userCreated = UserModels.create(userToCreate);

        console.log(userCreated);
        //return res.redirect('user/profile' + user.id);
        //return res.redirect('user/login');
        return res.send(userCreated);
    },
    /*create: function(req,res) {
        const nuevoUsuario = {
            ...req.body , 
            password: bcryptjs.hashSync(req.body.pass, 10),
            passConfirm: bcryptjs.hashSync(req.body.passConfirm , 10),
            imagen: req.file ? req.file.filename : 'ImagenUsuario.png'
        }
        
    UserModels.create(nuevoUsuario)
    res.redirect("/")
},*/

processLogin: (req, res) => {
    //Verificamos si hay errores
    const resultValidation = validationResult(req); 

    if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
        return res.render('users/login' , {
            errors: resultValidation.mapped() , 
            old: req.body
        });
    }

    // SI no llega haber errorres, verificamos si el mail y password, coinciden con el de algun usuario ya registrado en la base de datos
    let userToLogin = User.findByField('email', req.body.email);
    
    if(userToLogin){
        let isOkPassword = bcryptjs.compareSync(req.body.passwordLogin, userToLogin.password);
        if(isOkPassword) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
            res.redirect('/user/profile');
        }
        return res.render('user/login', {
            errors: {
                emailLogin: {
                    msg: 'La credencial es invalida'
                }
            }
        });
    }
    return res.render('user/login', {
        errors: {
            email: {
                msg: 'No se encuentra este email en nuestra base de datos'
            }
        }
    });
},
profile: (req, res) => {
    /*return res.render('userProfile', {
        user: req.session.userLogged
    })*/

    let user = req.session.userLogged;
    res.render('users/profile', { user });
},
logout: (req, res) => {
    req.session.destroy();

    return res.redirect('/');
}

}

module.exports = userController;