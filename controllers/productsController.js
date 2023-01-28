const path = require('path'); 
const fs = require('fs'); 

const productsJSON = fs.readFileSync(path.join(__dirname , '../data/products.JSON') , 'utf-8');
let products = JSON.parse(productsJSON); 


const productsController = {
    index: (req, res)=>{
        res.render('products/products' , { products })
    }, 
    crearProducto: (req, res)=>{
        res.render('products/crearProductos')
    }, 
    detail: (req , res )=>{
        const elegido = products.find( p => p.id == req.params.id );
        res.render('products/productDetail' , { elegido } )
    }, 
    store: (req, res)=>{

        const nuevoId = products ? products[products.length - 1].id + 1 : 0 ;
        const image = req.file ? req.file.filename : 'image.png';

        const newProduct = {
            id: nuevoId , 
            ...req.body , 
            imagen: image
        }

        products.push(newProduct);
        fs.writeFileSync( path.join(__dirname , '../data/products.JSON') , JSON.stringify(products) )
        res.redirect('/products')
    }, 

    edit: (req , res)=>{

        const elegido = products.find( p => p.id == req.params.id )
        res.render('products/editarProductos' , { elegido })
    }, 

    update: (req , res)=>{
       
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == req.params.id) {
                if (req.file) {
                   fs.unlinkSync(path.join(__dirname , `../public/products/${products[i].imagen}`))
                } 
                const image = req.file ? req.file.filename : 'image.png';
                products[i] = {
                    id: req.params.id, 
                    ...req.body, 
                    imagen: image
                }; 
            }
        };

        fs.writeFileSync(  path.join(__dirname , '../data/products.JSON') , JSON.stringify(products)); 
        res.redirect('/products'); 
    }, 

    delete: (req, res)=>{

        const productsFiltrados = products.filter( p => p.id != req.params.id ); 
        const elegido = products.find( p => p.id == req.params.id );
        fs.unlinkSync(path.join(__dirname , `../public/products/${elegido.imagen}`));
        products = [...productsFiltrados]; 
        fs.writeFileSync(  path.join(__dirname , '../data/products.JSON') , JSON.stringify(products)); 
        res.redirect('/products'); 
    } 
}
module.exports = productsController; 