const { Sequelize } = require('sequelize');
const config = require('../config/db.config')
const sequelize = new Sequelize(config.table, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  logging: (msg) => {
    // console.log(msg)
  },
  timezone:'+08:00',
});


module.exports = {
  sequelize
}