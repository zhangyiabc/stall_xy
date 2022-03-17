const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const Vendor = sequelize.define('Vendor',{
    prestige:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:100
    },
    vName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    sNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    sIdPhoto:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
});
module.exports = Vendor