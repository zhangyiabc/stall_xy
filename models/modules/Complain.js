const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
//投诉信息表
const Complain = sequelize.define('Complain',{
    //发起投诉人
    initiator:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    targetId:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
})
module.exports = Complain