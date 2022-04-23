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
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    photo:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    //用户看到的状态0-待处理；1-投诉生效：确认违规；2-投诉不生效：无违规操作;3-恶意投诉
    userSee:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
})
module.exports = Complain