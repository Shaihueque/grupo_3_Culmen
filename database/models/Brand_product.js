module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Brand_product'; 

    const col = {

        brand_id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        brand_name: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'brand_product', 
        timestamps: false
    } ;

    const Brand_product = sequelize.define(alias, col, config);

    return Brand_product;

}