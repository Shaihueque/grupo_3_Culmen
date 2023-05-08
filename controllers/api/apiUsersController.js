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
                    detail: `${req.protocol}://${req.get('host')}/api/users/${user.iduser}`
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
                image: `/users/${user.avatar}`
            })
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = apiUsersController; 