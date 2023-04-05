module.exports = function (sequelize, dataTypes) {

    let alias = "category";

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
        tableName: "category",
        timestamps: false
    }

    let category = sequelize.define(alias, cols, config);

    category.associate = function(models){
        category.hasMany(models.Productos, {
            as: "Productos",
            foreignKey: "category_id"
        })
    }

    return category;
}