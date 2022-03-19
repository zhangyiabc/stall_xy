const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
//用户信息表
const User = sequelize.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allwoNull:false,
    },
    nickName:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
})
module.exports = User