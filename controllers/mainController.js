// OBJETOS LITERAL DE LAS RUTAS PARA EL LINK CORRESPONDIENTE A CADA EJS/HTML
/* const rutas = {
    home: "/css/home.css", 
    carrito: "css/carrito.css"
} */


const mainController = {
    index: (req, res)=>{
        res.render('home')
    }
}

module.exports = mainController; 