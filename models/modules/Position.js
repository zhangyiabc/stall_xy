const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const Position = sequelize.define('Position', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // 这是其他模型参数
  paranoid: true,
  createdAt: true,
  updatedAt: false,
})

module.exports = Position