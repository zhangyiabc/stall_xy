const { sequelize } = require("./db")
require('./modules/Area')
require('./modules/Vendor')
sequelize.sync({alter:true}).then((res) => {
  console.log('所有模型已同步')
})