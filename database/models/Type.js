module.exports = function (sequelize, dataTypes) {

    let alias = "Type";

    let cols = {
        id: {
            type: dataTypes.INTEGER,    
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        }
    }
      
    let config = {
        tableName: "type",
        timestamps: false
    }

    let Type = sequelize.define(alias, cols, config);

    Type.associate = function(models){
        Type.hasMany(models.Productos, {
            as: "Product",
            foreignKey: "type_id"
        })
    }

    return Type;
}