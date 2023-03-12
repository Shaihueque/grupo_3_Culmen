

module.exports = ( sequelize, DataTypes )=>{


    const alias = 'Product'

    const col = {

        idProduct: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        discount: DataTypes.INTEGER , 

        stars: DataTypes.INTEGER, 

        description:{
            type: DataTypes.TEXT ,
            length: 1000
        }, 

        price: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 

        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 

        image_product_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references:{
                model: 'image_product',
                key: 'id'
            }
        }, 
        brand_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references:{
                model: 'brand_product',
                key: 'brand_id'
            }
        }, 
        waist_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references:{
                model: 'waist',
                key: 'id'
            }
        }, 
        clothes_type_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references:{
                model: 'clothes_type',
                key: 'id'
            }
        }, 
        category_id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references:{
                model: 'category_product',
                key: 'idcategory_product'
            }
        }
    }

    const config = {

        tableName : 'Product', 
        timestamps: false,
        paranoid: true 
    };



    const Product = sequelize.define(alias, col, config);

    return Product;
};