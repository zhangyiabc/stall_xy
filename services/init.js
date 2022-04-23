const Area = require('../models/modules/Area')
const validate = require('validate.js')

validate.validators.AreaIsExist = async (value) => {
  const temp =await  Area.findByPk(+value)
  if(temp){
    return 
  }else{
    return "can't find !"
  }
}

const User = require('../models/modules/User')
validate.validators.UserIsExist = async (value) => {
  const temp = await User.findByPk(+value)
  if(temp){
    return
  }else{
    return "can't find !"
  }
}
