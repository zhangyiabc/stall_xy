const Stall = require('../../models/modules/Stall')
const validate = require('validate.js')
const {Sequelize} = require("sequelize");
const User = require('../../models/modules/User');
const Op = Sequelize.Op;
//添加一个摊位信息
const addStall = async(obj)=>{
    const rules = {
        status:{
              type:'boolean',
              
        },
        positionId:{
            presence: {
                allowEmpty: false,
            },
              type:'number',
        },
        areaId:{
            presence: {
                allowEmpty: false,
            },
            type:'number',    
        },
        toDay:{
            type:'date'
        }
    }
    try{
        await validate.async(obj,rules)
    }catch(error){
        return {
            code: '1002',
            data: [],
            msg: error
          }
    }
    const ins = Stall.build(obj)
    const result = await ins.save()
    const res = result.toJSON()
    return{
        code: '1001',
        data: res,
        msg: "success" 
    }
}
//删除一个摊位信息
const deleteStall = async(id)=>{
    const res = await Stall.destroy({
        where: {
          id: +id
        }
      })
      if (res === 1) {
        return {
          code: '1001',
          data: res,
          msg: 'success',
        }
      } else {
        return {
          code: '1002',
          data: res,
          msg: 'fail'
        }
      }
}
//查找摊位信息
const getAllStall = async({
    page = 1,
    size = 10,
    status,
    positionId,
    areaId,
    UserId
} = {})=>{
    const option = {}
    if(status){
        option.status = status;
    }if(positionId){
        option.positionId = positionId;
    }if(areaId){
        option.areaId = areaId;
    }if(UserId){
        option.UserId = UserId;
    }
    const res = await Stall.findAndCountAll({
        attributes: ['id', 'status', 'positionId','areaId','toDay','UserId'],
        limit: +size,
        offset: (page - 1) * +size,
        where: option,
        include:{
            model:User,
            attributes:['id','name','nickName','VendorId']
        }
      })
      const result = JSON.parse(JSON.stringify(res.rows))
      return {
        code:'1001',
        count: res.count,
        data: result
      }
}
//修改摊位信息
const updateStall = async(upObj,id)=>{
    const rules = {
        status:{
            presence: {
                allowEmpty: false,
            },
              type:'boolean',
        },
        positionId:{
            presence: {
                allowEmpty: false,
            },
              type:'number',
        },
        areaId:{
            presence: {
                allowEmpty: false,
            },
            type:'number',    
        },
        toDay:{
            type:'date'
        },
        UserId:{
            type:'number',
        }
    }
    try{
        await validate.async(upObj,rules)
    }catch(error){
        return{
            code: '1002',
            data: [],
            msg: error
          }
    }
    const res = await Stall.update(upObj, {
        where: {
          id: +id
        }
      })
      return {
        code: '1001',
        data: res,
        msg: 'success'
      }
}
module.exports = {
    addStall,
    deleteStall,
    updateStall,
    getAllStall
}