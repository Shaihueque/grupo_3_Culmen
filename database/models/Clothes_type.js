module.exports = ( sequelize, DataTypes )=>{

    const alias = 'Clothes_type'; 

    const col = {

        id: {
            type: DataTypes.INTEGER , 
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }; 

    const config ={
        tableName : 'clothes_type', 
        timestamps: false
    } ;

    const clothes_type = sequelize.define(alias, col, config);

    return clothes_type;

}