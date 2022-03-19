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
