const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const Area = sequelize.define('Area', {
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  describe: {
    type: DataTypes.STRING,
    // allowNull 默认为 true
    allowNull: true
  }
}, {
  // 这是其他模型参数
  paranoid: true,
  createdAt: true,
  updatedAt: false,
});
module.exports = Area