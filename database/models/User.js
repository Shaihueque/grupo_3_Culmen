

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

    User.associate = (models)=>{

        User.belongsTo( models.Ubication_user , {
            as: 'ubication_user' , 
            foreignKey: 'ubication_user'
        });                               // un Usuario va a tener un resgistro de ubicacion.

        User.belongsTo(models.Contact_user , {
            as: 'contact_user', 
            foreignKey: 'contact_user'
        });                              // un usuario va a tener un registro de contacto

        User.hasMany(models.Sale_by_user , {
            as: 'sale_by_user', 
            foreignKey: 'user_id'
        });   // un usuario puede tener muchas detalle venta

        User.belongsToMany(models.Product , {
            as: 'products', 
            through: 'favorite_product', 
            foreignKey: 'user_id',
            otherKey: 'product_id',
            timestamps: false
        });// relacion muchos a muchos entre user y product a traves de la tabla pivot favorite_product.

    }


    return User
}