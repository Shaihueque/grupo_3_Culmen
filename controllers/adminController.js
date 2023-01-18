const adminController = {
    crearProducto: (req, res)=>{
        res.render('products/crearProductos')
    }, 
    editarproducto: (req,res)=>{
        res.render('products/editarProductos')
    } 
}


module.exports = adminController; 