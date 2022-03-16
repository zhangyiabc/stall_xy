const { sequelize } = require("./db")
require('./modules/Area')
sequelize.sync({alter:true}).then((res) => {
  console.log('所有模型已同步')
})