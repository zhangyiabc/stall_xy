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
    },
    //用户看到的状态0-待审核；1-已通过；2-已拒绝
    userStatus:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
})
module.exports = Apply