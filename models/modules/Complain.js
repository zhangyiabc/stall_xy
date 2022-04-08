const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
//投诉信息表
const Complain = sequelize.define('Complain',{
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    targetId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
})
module.exports = Complain