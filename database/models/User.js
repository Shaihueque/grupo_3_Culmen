

module.exports = ( sequelize, DataTypes )=>{


    const alias = 'User'

    const col = {

        iduser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING(45), 
            allowNull : false
        },         
        last_name : {
            type: DataTypes.STRING(45), 
            allowNull : false
        }, 
        email: {
            type: DataTypes.STRING(45), 
            allowNull: false, 
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        is_admin: {
            type: DataTypes.TINYNIT(1), 
            allowNull: false
        }, 
        contact_user : {
            type: DataTypes.INTEGER, 
            references: {
                model: 'contact_user', 
                key: 'idcontact_user'
            }
        },
        ubication_user : {
            type: DataTypes.INTEGER, 
            references: {
                model: 'ubication_user', 
                key: 'idubication_user'
            }
        }
    }; 

    const config = {

        tableName : 'user', 
        timestamps: false,
        paranoid: true 
    };



    const User = sequelize.define(alias, col, config);

    return User
}