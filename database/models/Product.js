module.exports = function (sequelize, dataTypes) {

    let alias = "Productos";

    let cols = {
        id: {
            type: dataTypes.INTEGER,    
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.DECIMAL
        },
        image: {
            type: dataTypes.STRING
        },
        /*category_id:{
            type: dataTypes.INTEGER
        },*/
        category_id: {
            type: dataTypes.INTEGER, 
            /*allowNull: false, */
            references:{
                model: 'Category',
                key: 'id'
            }
        },
        type_id:{
            type: dataTypes.INTEGER
        },
        waist_id:{
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.belongsTo(models.category, {
            as: "category",
            foreignKey: "category_id"
        });
        Producto.belongsTo(models.Type, {
            as: "type",
            foreignKey: "type_id"
        });
        Producto.belongsTo(models.Waist, {
            as: "waist",
            foreignKey: "waist_id"
        });
        Producto.hasMany(models.image_secondary, {
            as: "image_secondary",
            foreignKey: "productos_id"
        });
        Producto.belongsToMany(models.User, {
            as: "User",
            through: "product_favorite",
            foreignKey: "productos_id",
            otherKey: "users_id",
            timestamps: false
        });
    }

    return Producto;
}