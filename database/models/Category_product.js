module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Category_product'; 

    const col = {

        idcategory_product: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'category_product', 
        timestamps: false
    } ;

    const Category_product = sequelize.define(alias, col, config);

    return Category_product;

}