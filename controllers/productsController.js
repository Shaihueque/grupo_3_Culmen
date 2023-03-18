const path = require('path'); 
const fs = require('fs'); 
const { validationResult } = require('express-validator'); 

// SEQUELIZE 
const { Association } = require("sequelize");
const { Sequelize } = require("../database/models");
const db = require("../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
const Op = Sequelize.Op;
const Product = db.Product; 
const Image_product = db.Image_product;
const Other_images = db.Other_images; 
const Category_product = db.Category_product; 
const Clothes_type = db.Clothes_type; 
const Brand_product = db.Brand_product;
const Waist = db.Waist; 

const productsJSON = fs.readFileSync(path.join(__dirname , '../data/products.json') , 'utf-8');
let products = JSON.parse(productsJSON); 


const productsController = {

   index: async(req, res)=>{
        try{
            const products = await Product.findAll({
                include: [{ association: 'imageProduct' }]
            });
            //return res.json(products);
            return res.render('products/products' , { products })
        }
       catch(err){
        console.log(err)
       }
    },

    crearProducto: async(req, res)=>{

        try{
            const Brands = await Brand_product.findAll();
            const Categories = await Category_product.findAll();
            const Clothes = await Clothes_type.findAll();
            const Waists = await Waist.findAll({
                order: [['id', 'ASC']]
              });

            res.render('products/crearProductos', {
                Categories , Brands ,Clothes , Waists
            })

        }
        catch(err){
            console.log(err)
        }
    }, 


   /*  detail: (req , res )=>{
        const elegido = products.find( p => p.id == req.params.id );
        res.render('products/productDetail' , { elegido } )
    },  */

    detail: async(req, res)=>{

        try{
            const elegido = await Product.findByPk( req.params.id , {
                include: [{ association: 'imageProduct' }, { association: 'other_images'}]
            } );
            //return res.json(elegido)
            res.render('products/productDetail', { elegido })   
        }
       catch(err){
        console.log(err)
       }
    },
    store: (req, res)=>{

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
    }, 

    store2 : async ( req, res ) => {

        try{

        const resultValidation = validationResult(req); 
        const Brands = await Brand_product.findAll();
        const Categories = await Category_product.findAll();
        const Clothes = await Clothes_type.findAll();
        const Waists = await Waist.findAll({
                order: [['id', 'ASC']]
              });

        if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
            return res.render('products/crearProductos' , {
                errors: resultValidation.mapped() , 
                old: req.body, 
                Brands, Categories, Clothes, Waists
            });
        }


            let idImage ;
        // 1ero verificar si me llega una imagen creada con multer o llega vacio
        if (req.files.file_img && req.files.file_img[0]){
            // si llega una imagen

            // esto no va a suceder nunca xq multer le pone un nombre unico a cada imagen

            // Buscar si ya existe una imagen con el mismo nombre
            const existingImage = await Image_product.findOne({ where: { image_route: req.files.file_img[0].filename } });
            if ( existingImage ) {
                //si la imagen existe, usar su id existente
                idImage = existingImage.id;
            }else {
                // Si la imagen no existe, crearla y usar su nuevo ID
                const newImage = await Image_product.create({
                image_route: req.files.file_img[0].filename,
                });
                idImage = newImage.id;
            }
        }else{
            // si no llega ninguna imagen usar la de default
            const defaultImage = await Image_product.findOne({
                where: {
                  image_route: 'image.png'
                }
              });
              idImage = defaultImage.id;
        }

        const product = await Product.create({
            name: req.body.nombre, 
            description: req.body.descripcion, 
            price : parseInt(req.body.precio),
            category_id: req.body.category,
            clothes_type_id:  req.body.tipo,
            waist_id: req.body.talle, 
            brand_id: req.body.marca,
            discount: 0 , 
            stars: 0, 
            image_product_id: idImage
        }); 

        // ahora obtener el id de este producto para asociarle las imagenes que llegan
        const productId = product.idProduct; // Obtener el ID del producto creado

        if (req.files.files_img && req.files.files_img.length > 0) {
            req.files.files_img.forEach(async (img) => {
              const otherImage = await Other_images.create({
                image: img.filename, //en el modelo le agrego un valor por default si no llega nada
                id_product: productId
              });
            });
          }

          return res.redirect('/products');

        }
        catch(err){
            console.log(err)
        }
       
    },

    edit: async(req , res)=>{

        try{
            const elegido = await Product.findByPk(req.params.id, {
                include: ['category_product', 'brand_product', 'clothes_type', 'waist']
            });

            const Brands = await Brand_product.findAll();
            const Categories = await Category_product.findAll();
            const Clothes = await Clothes_type.findAll();
            const Waists = await Waist.findAll({
                order: [['id', 'ASC']]
              });
            //res.json(elegido);
            return res.render('products/editarProductos' , { elegido , Brands, Categories, Clothes, Waists })

        }
        catch(err){
            console.log(err)
        }
    }, 

    update: (req , res)=>{
       
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
    }, 

    update2: async(req, res)=>{

        try{

            // si hay errores necesito todo esto para volver a renderizar la vista
            const resultValidation = validationResult(req); 

            const elegido = await Product.findByPk(req.params.id, {
                include: ['category_product', 'brand_product', 'clothes_type', 'waist']
            });
            const Brands = await Brand_product.findAll();
            const Categories = await Category_product.findAll();
            const Clothes = await Clothes_type.findAll();
            const Waists = await Waist.findAll({
                    order: [['id', 'ASC']]
                  });
    
            if ( !resultValidation.isEmpty() ) {  // primero verificamos si hay errores
                //return res.json(req)
                return res.render('products/editarProductos' , {
                    errors: resultValidation.mapped() , 
                    elegido,
                    Brands, Categories, Clothes, Waists
                });
            }

            // antes MANIPULAR LAS IMAGENES QUE LLEGAN 
            let idImage ;
            // 1ero verificar si me llega una imagen creada con multer o llega vacio
            if (req.files.file_img && req.files.file_img[0]){
                // si llega una imagen --> SIEMPRE LLEGA UNA IMAGEN XQ YA ESTA VALIDADO
                 
                    // Si la imagen no existe, crearla y usar su nuevo ID
                    const newImage = await Image_product.create({
                    image_route: req.files.file_img[0].filename,
                    });
                    idImage = newImage.id;
                }
            else{
                // si no llega ninguna imagen usar la de default
                const defaultImage = await Image_product.findOne({
                    where: {
                      image_route: 'image.png'
                    }
                  });
                  idImage = defaultImage.id;
            }

            // ahora OTHER IMAGES


            // no hay errores pasamos a ACTUALIZAR EL PRODUCTO
            // UPDATE devuelve un array con [cantidad de registros modificados, registros modificados]
            const product  = await Product.update({

                        name: req.body.nombre, 
                        description: req.body.descripcion, 
                        price : parseInt(req.body.precio),
                        category_id: req.body.category,
                        clothes_type_id:  req.body.tipo,
                        waist_id: req.body.talle, 
                        brand_id: req.body.marca,
                        discount: 0 , 
                        stars: 0, 
                        image_product_id: idImage

                    },{
                        where: {
                            idProduct : req.params.id
                        }//,
                        //returning: true // esto es necesario para que sequelize devuelva el registro modificado
                    })

            // ahora obtener el id de este producto para asociarle las imagenes que llegan
            const productId = req.params.id; // Obtener el ID del producto 
                  

             // Eliminar las imágenes antiguas de la tabla "other_images"
            await Other_images.destroy({ where: { id_product: productId } });
            // deberia saltar un cartelito de aviso al usuario de que si quiere conservar las imagenes anteiories debe guardarlas y subirlas nuevamente por ej.



            //return res.json(updatedProduct)    
            //return res.json(count) 
            if (req.files.files_img && req.files.files_img.length > 0) {
                req.files.files_img.forEach(async (img) => {
                    const otherImage = await Other_images.create({
                        image: img.filename, //en el modelo le agrego un valor por default si no llega nada
                        id_product: productId
                    });
                });
            }            

            return res.redirect('/products')
        }
      
        catch(err){
            console.log(err)
        }

    },
    delete: (req, res)=>{

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
    } , 

    delete2: async(req, res)=>{
        // PRIMERO TENGO QUE ELIMINAR LAS RELACIONES
        // LUEGO BORRAR EL PRODUCTO 

       /*  const product = await Product.findByPk(req.params.id);
        const otherImages = await product.getOther_images();
        for (const image of otherImages) {
            await image.destroy();
          } */

        try{

          await Other_images.destroy({
            where: {
              id_product: req.params.id
            }
          });
          
        const productDeleted = await Product.destroy({
            where:{
                idProduct : req.params.id
            }
        })
       return res.redirect('/products')
        }
        catch(err){
            console.log(err)
        }
    }, 

    search: async(req, res)=>{

        try{ 
        const products = await Product.findAll({
            where: {
                name: { [Op.like ] : `%${req.query.buscador_home}%`  }
            },        
            include: [{ association: 'imageProduct' }]

        });

        //return res.json(products)
        res.render('products/listarProducts', { products })
        }
        catch(err){
            console.log(err)
        }
    }
}
module.exports = productsController; 