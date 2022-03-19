const Admin = require('../../models/modules/Admin')
const validate = require('validate.js')
const { Sequelize } = require("sequelize");
const { pick } = require('../../utils/pick');
const Op = Sequelize.Op;
//新增管理员
const addAdmin = async (adminObj)=>{
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
        await validate.async(adminObj,rules)
    }catch(error){
        return{
            code:'1002',
            data:[],
            msg:error
        }
    }
    const ins = Admin.build(adminObj)
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
    console.log(res)
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
                minimum: 6,
                maximum: 20,
                message: "must be length is 6-20",
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
      return res
}
module.exports = {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAllAdmin,
}