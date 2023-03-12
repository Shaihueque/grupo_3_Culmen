module.exports = ( sequelize, DataTypes )=>{

    const alias = 'User_has_detalle_venta_has_Product'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        user_has_detalle_venta_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'user_has_detalle_venta',
                key: 'id'
            }
        },
        Product_idProduct:  {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'Product',
                key: 'idProduct'
            }
        }, 

        quantity: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        unit_price: {
            type: DataTypes.INTEGER, 
            allowNull: false
        } 
    };
    
    const config ={
        tableName : 'user_has_detalle_venta_has_Product', 
        timestamps: false
    } ;

    const User_has_detalle_venta_has_Product = sequelize.define(alias, col, config);

    return User_has_detalle_venta_has_Product;

}