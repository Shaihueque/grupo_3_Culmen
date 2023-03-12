module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Image_product'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        image_route: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'image_product', 
        timestamps: false
    } ;

    const Image_product = sequelize.define(alias, col, config);

    return Image_product;

}