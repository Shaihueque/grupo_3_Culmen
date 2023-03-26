module.exports = function (sequelize, dataTypes) {

    let alias = "ProductsFavorite";

    let cols = {
        id: {
            type: dataTypes.INTEGER,    
            primaryKey: true,
            autoIncrement: true
        },
        productos_id:{
            type: dataTypes.STRING
        },
        users_id:{
            type: dataTypes.INTEGER
        }
    }
      
    let config = {
        tableName: "product_favorite",
        timestamps: false
    }

    let ProductsFavorite = sequelize.define(alias, cols, config);

    return ProductsFavorite;
}