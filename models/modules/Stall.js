const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
//摊位信息表
const Stall = sequelize.define('Stall',{
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    positionId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    areaId:{
        type:DataTypes.INTEGER,
        allowNull:false,      
    },
    toDay:{
        type:DataTypes.DATE,
        allowNull:false,
    }
},{
    paranoid: true,
    createdAt: true,
    updatedAt: false,
})
module.exports = Stall