module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Ubication_user'; 

    const col = {

        idcontact_user: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING(100), 
            allowNull: false
        },
        floor: DataTypes.SMALLINT,
        number: DataTypes.SMALLINT,
        apartment: DataTypes.STRING
    }; 

    const config ={
        tableName : 'contact_user', 
        timestamps: false
    } ;

    const Contact_user = sequelize.define(alias, col, config);

    return Contact_user;

}