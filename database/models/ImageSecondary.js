module.exports = function (sequelize, dataTypes) {

    let alias = "ImageSecondary";

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

    let ImageSecondary = sequelize.define(alias, cols, config);

    ImageSecondary.associate = function(models){
        ImageSecondary.belongsTo(models.Productos, {
            as: "Product",
            foreignKey: "productos_id"
        })
    }

    return ImageSecondary;
}