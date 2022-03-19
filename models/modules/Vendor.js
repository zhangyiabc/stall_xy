const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const Vendor = sequelize.define('Vendor',{
    prestige:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:100
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    sNo:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    sIdPhoto:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
});
module.exports = Vendor