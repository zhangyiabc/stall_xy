const { sequelize } = require("./db")
require('./modules/Area')
require('./modules/Vendor')
require('./modules/Complain')
require('./modules/Apply')
sequelize.sync({alter:true}).then((res) => {
  console.log('所有模型已同步')
})