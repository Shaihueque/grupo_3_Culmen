module.exports = function (sequelize, dataTypes) {

    let alias = "image_secondary";

    let cols = {
        id: {
            type: dataTypes.INTEGER,    
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        productos_id:{
            type: dataTypes.INTEGER
        }
    }
      
    let config = {
        tableName: "image_secondary",
        timestamps: false
    }

    let image_secondary = sequelize.define(alias, cols, config);

    image_secondary.associate = function(models){
        image_secondary.belongsTo(models.Productos, {
            as: "Product",
            foreignKey: "productos_id"
        })
    }

    return image_secondary;
}