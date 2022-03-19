const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
//管理员表
const Admin = sequelize.define('Admin',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    // 这是其他模型参数
    paranoid: true,
    createdAt: true,
    updatedAt: false,
  })
  module.exports = Admin