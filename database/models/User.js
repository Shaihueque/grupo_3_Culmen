module.exports = function (sequelize, dataTypes) {

    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,    
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        last_Name: {
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.INTEGER
        },
        admin:{
            type: dataTypes.TINYINIT
        }
        
    }
    let config = {
        tableName: "users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsToMany(models.Product, {
            as: "Product",
            through: "product_favorite",
            foreignKey: "users_id",
            otherKey: "productos_id",
            timestamps: false
        });
    }

    return User;
}