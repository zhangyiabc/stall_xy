const Admin = require('../../models/modules/Admin')
const validate = require('validate.js')
const { Sequelize } = require("sequelize");
const { pick } = require('../../utils/pick');
const Op = Sequelize.Op;
//新增管理员
const addAdmin = async (adminObj)=>{
    const obj = pick(adminObj,'name','password')
    const rules = {
        name:{
            presence:{
                allowEmpty:false,
            },
            type: "string",
            length: {
                minimum: 5,
                maximum: 15,
                message: "must be length is 5-15",
              },
        },
        password:{
            presence:{
                allowEmpty:false,
            },
            type: "string",
            length: {
                minimum: 5,
                maximum: 20,
                message: "must be length is 5-20",
              },
        }
        
    }
    try {
        await validate.async(obj,rules)
    }catch(error){
        return{
            code:'1002',
            data:[],
            msg:error
        }
    }
    const ins = Admin.build(obj)
    const result = await ins.save()
    const res = result.toJSON()
    return {
        code:'1001',
        data:res,
        msg:'success'
    }
}
//删除管理员
const deleteAdmin = async (id)=>{
    const res = await Admin.destroy({
        where:{
            id:+id
        }
    })
    return {
        code:'1001',
        data:res,
        msg:`已删除${res}条数据`
    }
}
//查找管理员信息
const getAllAdmin = async ({page = 1,size = 10,name}={})=>{
    const option = {}
    if(name){
        option.name={
            [Op.like]:`%${name}%`
        }
    }
    const res = await Admin.findAndCountAll({
        attributes:['id','name','password'],
        limit:+size,
        offset: (page - 1) * +size,
        where: option
    })
    const result = JSON.parse(JSON.stringify(res.rows))
    return {
        code:'1001',
        count: res.count,
        data: result
    }
}
//更新管理员信息
const updateAdmin = async(adminObj,id)=>{
    const obj = pick(adminObj,'password')
    const rules={
        password:{
            type: "string",
            length: {
                minimum: 5,
                maximum: 20,
                message: "must be length is 5-20",
              },
        }
    }
    try{
        await validate.async(obj,rules)
    }catch(error){
        return {
            code:'1002',
            data:[],
            msg:error
        }
    }
    const res = await Admin.update(obj,{
        where:{
          id:+id
        }
      })
      return{
          code:'1001',
          res:res,
          msg:`已更改${res}条信息`
      }
      
}

//管理员登录
const login = async ({name,password}={})=>{
    if(!name||!password){
        return {
            code:'1002',
            data:[],
            msg:'name or password could not be null!'
        }
    }
    const res = await Admin.findOne({where:{name,password}});
    if(res===null){
        return {
            code:'1003',
            data:[],
            msg:'not find'
        }
    }else{
        return {
            code:'1001',
            data:[],
            msg:'success'
        }
    }
}
module.exports = {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAllAdmin,
    login
}