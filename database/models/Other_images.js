module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Other_images'; 

    const col = {

        id_images: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        id_product: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references: {
                model: 'product',
                key: 'idProduct'
            }
        }
    }; 

    const config ={
        tableName : 'other_images', 
        timestamps: false
    } ;

    const Other_images = sequelize.define(alias, col, config);

    return Other_images;

}