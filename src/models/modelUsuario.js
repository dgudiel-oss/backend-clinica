const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Usuario = db.define('usuario',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    nombreUsuario:{
        type: DataTypes.STRING(200),
        allowNull: false

    },
    contrasena:{
        type:DataTypes.STRING(200),
        allowNull: false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    roleId:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    correo:{
        type:DataTypes.STRING(50),
        allowNull: false
    }, 
    pin:{
        type:DataTypes.STRING(8),
        allowNull: true,
    }, 
    pin_expirated:{
        type:DataTypes.DATE,
        allowNull: true
    }

},
{
    tableName: 'usuarios',
    timestamps: true,
})

module.exports = Usuario;