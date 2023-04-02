module.exports = function (sequelize, dataTypes) {

    let alias = "Waist";

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
        tableName: "waist",
        timestamps: false
    }

    let Waist = sequelize.define(alias, cols, config);

    Waist.associate = function(models){
        Waist.hasMany(models.Productos, {
            as: "Product",
            foreignKey: "waist_id"
        })
    }

    return Waist;
}