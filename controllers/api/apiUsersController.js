const path = require('path');
const db = require("../../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
//const Op = Sequelize.Op;
const User = db.User;


const apiUsersController = {
    list: async (req, res) => {
        try{
            const users = await User.findAll();
            return res.json( { 
                count: users.length ,
                users: users.map((user) => ({
                    id: user.iduser ,
                    name: user.name,
                    email: user.email,
                    detail: `http://localhost:3030/api/users/${user.iduser}`    
                }) )
            } );
        }
       catch(err){
        console.log(err)
       }
    }, 

    detail: async( req, res )=>{
        try{
            const user = await User.findByPk(req.params.id, 
                { attributes: { exclude: ['password', 'is_admin'] } });
            return res.json({
                user, 
                path: path.resolve(`C:/Users/Usuario/Desktop/CURSO FULLSTACK Practicas/Proyecto_Integrador_DH/grupo_3_Culmen/public/users/${user.avatar}`)
            })
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = apiUsersController; 