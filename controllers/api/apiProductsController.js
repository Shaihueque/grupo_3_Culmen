const path = require('path');
const db = require("../../database/models"); // SIEMPRE REQUERIR LA BASE DE DATOS !! esta exportada como db tmb
//const Op = Sequelize.Op;
const Product = db.Product;


const apiProductsController = {
    list : async(req, res)=>{
    try {
        // endopoint: http://localhost:3030/api/products?page=0&size=10

        const { page = 0, size = 10 } = req.query;

        const response = await db.Category_product.findAll({
            attributes: ['category', [db.sequelize.fn('COUNT', 'Product.idProduct'), 'count']],
            include: [{
              model: db.Product,
              as: 'product',
              attributes: []
            }],
            group: ['category']
        })

        const products = await Product.findAndCountAll({
            limit: +size,
            offset: (+page) * (+size),
            attributes: ['idProduct', 'name', 'description'],
          });

        const count = products.count
        const totalPages = Math.ceil(count / size);
        const currentPage = +page;

        const next = currentPage < totalPages - 1
            ? `http://localhost:3030/api/products?page=${currentPage + 1}&size=${size}`
            : null;

        const previous = currentPage > 0
            ? `http://localhost:3030/api/products?page=${currentPage - 1}&size=${size}`
            : null;

        return res.json({
            count: products.count, 
            countByCategory: response, 
            next,
            previous,
            products: products.rows.map(p => ({
                id: p.idProduct, 
                name: p.name,
                description: p.description, 
                link: `${req.protocol}://${req.get('host')}/api/products/${p.idProduct}`
            }))

        })


    } catch (error) {
        console.log(error)
    }
    }, 
    detail: async(req, res) => {
        try{
            const product = await Product.findByPk(req.params.id, {
                include: ['category_product', 'clothes_type', 'imageProduct', 'brand_product', 'waist']
            });
            return res.json({
                product: {
                    id: product.idProduct, 
                    name: product.name, 
                    description: product.description, 
                    price: product.price, 
                    image: `${req.protocol}://${req.get('host')}/products/${product.imageProduct.image_route}`,
                    category: product.category_product.category, 
                    type: product.clothes_type.type,
                    brand: product.brand_product.brand_name, 
                    waist: product.waist.waits 
                }
            })
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = apiProductsController; 