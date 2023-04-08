const path = require('path'); 
const fs = require('fs'); 
const { Association } = require("sequelize");
const db = require("../database/models");
const { body } = require('express-validator');
//const db = require("../database/models");

const productsJSON = fs.readFileSync(path.join(__dirname , '../data/products.json') , 'utf-8');
let products = JSON.parse(productsJSON); 


const productsController = {
    index: (req, res)=>{
        res.render('products/products' , { products })
    }, 
    crearProducto: async(req, res)=>{
        let category =  await db.category.findAll();
        let type = await db.Type.findAll();
        let waist = await db.Waist.findAll();
            return res.render('products/crearProductos', {category , type, waist}) 
        },
        
    guardarProducto: (req, res) => {
        console.log(req.body.nombre);
        //return res.json(req.body);
        //res.send(req.body);

        /*db.Productos.create({
            name: req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
            image: req.body.file_img,
            category_id: req.body.category,
            type_id: req.body.Type,
            waist_id: req.body.Waist
        })*/

        db.Productos.create({
            name: req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
            image: req.body.file_img,
            category_id: req.body.category,
            type_id: req.body.Type,
            waist_id: req.body.Waist
        })

         res.redirect("/products");
    },

    detail: (req , res )=>{
        const elegido = products.find( p => p.id == req.params.id );
        res.render('products/productDetail' , { elegido } )
    }, 

    detalleProducto: (req, res) =>{
        db.Productos.findByPk(req.params.id, {include: [{association: "category"}, {association: "type"}, {association: "waist"}, {association: "image_secondary"}]})
        .then(function(Productos){
            res.render("products/productDetail", {Productos: Productos})
        })
    },

    listadoPoductos: (req, res) =>{
        db.Productos.findAll()
        .then(function(Productos){
            res.render('products/products', {Productos:Productos})
        })
    },
    /*store: (req, res)=>{

        //const mainImage = req.files.file_img[0];
        const nuevoId = products ? products[products.length - 1].id + 1 : 1 ;
        //const image = req.files.file_img > 0 ? mainImage.filename : 'image.png';

        const image = req.files.file_img[0].filename ? req.files.file_img[0].filename : 'image.png';

        const secondaryImages = req.files.files_img;
        const onlyFilenames = secondaryImages.map( img => {
            const filename = img.filename || 'image.png';
            return { filename };
        })

        console.log(onlyFilenames)

        const newProduct = {
            id: nuevoId , 
            ...req.body , 
            imagen: image,  
            imagenes: onlyFilenames
        }

        products.push(newProduct);
        fs.writeFileSync( path.join(__dirname , '../data/products.JSON') , JSON.stringify(products, null, 2) )
        res.redirect('/products')
    }, */

    edit: (req, res)=>{
/*  
        const elegido = products.find( p => p.id == req.params.id )
        res.render('products/editarProductos' , { elegido })*/

        let ProductoElegido = db.Productos.findByPk(req.params.id);
        let Productos = db.Productos.findAll();
        
        Promise.all([ProductoElegido, Productos])
        .then(function([ProductoElegido, Productos]){
            //return res.json(Productos);
            res.render("products/editarProductos", {ProductoElegido: ProductoElegido, Productos: Productos});

        })
    }, 

    actualizar: (req, res) => {
        db.Productos.update({
            name: req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
            image: req.body.file_img,
            category_id: req.body.category,
            type_id: req.body.Type,
            waist_id: req.body.Waist
        },{
            where: {
                id: req.params.id
            }
        });
        res.redirect("products/productDetail" + req.params.id);
    
    },
    borrarProducto: (req, res) => {
        db.Productos.destroy({ 
            where: {
                id: req.params.id
            }
        })
        res.redirect("/products");
    }

    /*update: (req , res)=>{
       
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == req.params.id) {
                if (req.file) {
                   fs.unlinkSync(path.join(__dirname , `../public/products/${products[i].imagen}`))
                } 
                //const image = req.files.file_img > 0 ? req.files.file_img[0].filename : 'image.png';
            const image = req.files.file_img[0].filename ? req.files.file_img[0].filename : products[i].imagen;
            const secondaryImages = req.files.files_img;

                products[i] = {
                    id: req.params.id, 
                    ...req.body, 
                    imagen: image, 
                    imagenes: secondaryImages ? secondaryImages : [{filename: 'image.png' }]
                }; 
            }
        };
        fs.writeFileSync(  path.join(__dirname , '../data/products.JSON') , JSON.stringify(products, null, 2)); 
        res.redirect('/products'); 
    }, */

   
    /*delete: (req, res)=>{

        const productsFiltrados = products.filter( p => p.id != req.params.id ); 
        const elegido = products.find( p => p.id == req.params.id );
        
         if ( elegido.imagen != 'image.png' ) {
             console.log(elegido.imagen)
            fs.unlinkSync(path.join(__dirname , `../public/products/${elegido.imagen}`))
        } 

        if ( elegido.imagenes.length > 0 ) {
            for (let i = 0; i < elegido.imagenes.length; i++) {
                fs.unlinkSync(path.join(__dirname , `../public/products/${ elegido.imagenes[i].filename }`));
            }
        }

        products = productsFiltrados; 
        fs.writeFileSync(  path.join(__dirname , '../data/products.JSON') , JSON.stringify(products , null, 2)); 
        res.redirect('/products'); 
    } */
}
module.exports = productsController; 