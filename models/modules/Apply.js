const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
//申请信息表
const Apply = sequelize.define('Apply',{
    // name:{
    //     type:DataTypes.STRING,
    //     allowNull:false,
    // },
    stallId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    time:{
        type:DataTypes.DATE,
        allowNull:false,
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
})
module.exports = Apply