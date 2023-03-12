module.exports = ( sequelize, DataTypes )=>{

    const alias = 'User_has_detalle_venta'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'user',
                key: 'iduser'
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

        numero_factura : {
            type: DataTypes.STRING, 
            allowNull: false
        }, 

        detalle: DataTypes.STRING
    };
    
    const config ={
        tableName : 'user_has_detalle_venta', 
        timestamps: false
    } ;

    const User_has_detalle_venta = sequelize.define(alias, col, config);

    return User_has_detalle_venta;

}