// OBJETOS LITERAL DE LAS RUTAS PARA EL LINK CORRESPONDIENTE A CADA EJS/HTML
/* const rutas = {
    home: "/css/home.css", 
    carrito: "css/carrito.css"
} */


const mainController = {
    index: (req, res)=>{
        res.render('home')
    },
    carrito: (req, res)=>{ 
        res.render('carrito')
    },
    
    login: (req, res) => {
        res.render('users/login')
    },

    productDetail: (req, res) => {
        res.render('products/productDetail')
    }
}


module.exports = mainController; 