// OBJETOS LITERAL DE LAS RUTAS PARA EL LINK CORRESPONDIENTE A CADA EJS/HTML
/* const rutas = {
    home: "/css/home.css", 
    carrito: "css/carrito.css"
} */

const { Association } = require("sequelize");
const { Sequelize } = require("../database/models");
const db = require("../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
const Op = Sequelize.Op;



const mainController = {
    index: (req, res)=>{
        res.render('home')
    },
    carrito: async(req, res)=>{ 

        if (!req.session.userLogged) {
           return res.redirect('user/login')
        }

        const user = await db.User.findByPk(req.session.userLogged.iduser, {
            include: [{ 
                model: db.Product, 
                through: db.Favorite_product,
                as: 'products'
            }]
        });

        //return res.json(user)
        res.render('carrito')
    }, 

    addProduct: async(req, res)=>{

        const product = await db.Product.findByPk(req.params.idProduct); 
        //const user = await db.User.findByPk(req.session.userLogged.iduser); 
        const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.iduser) : null;
        // hacerlo con session, solo ir a la DB si necesito alguna info que no tengo en session
        if (!user) {
            return res.send('el usuario no esta loggeado')
        }
        
        const relacionCreada = await user.addProduct(product) //aca estoy usando la instancia del usuario
        //const relacionCreada2 = await product.addUser(req.session.userLogged.iduser) probar para


        return res.json(relacionCreada)
    }
    
}


module.exports = mainController; 