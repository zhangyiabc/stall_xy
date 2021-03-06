const Vendor = require("../../models/modules/Vendor")
const validate = require('validate.js')
const { Sequelize } = require('sequelize');
const { pick } = require("../../utils/pick");
const Op = Sequelize.Op;

const addVendor = async (vendorObj) => {
    const obj = pick(vendorObj,'name','phone','sNo','sIdPhoto','email')
    const rules = {
        name:{
            type:'string',
            length:{
                minimum:2,
                maximum:10,
                message:'must be length is 2-10'
            }
        },
        phone: {
            type: "string",
            length: {
                minimum: 11,
                maximum: 11,
                message: "must be length is 11"
            }
        },
        sNo: {
            type: "string",
            length: {
                minimum: 1,
                maximum: 10,
                message: "must be length is 1-10"
            },
        },
        sIdPhoto: {
            type: "string",
        },
        email: {
            type: 'string',
            length: {
                minimum: 5,
                maximum: 20,
                message: "must be length is 5-20"
            }
        }
    };
    try {
        await validate.async(vendorObj, rules);
    } catch (error) {
        return {
            code:'1002',
            data:[],
            msg:error
        }
    }
    
    const ins = Vendor.build(vendorObj)
    const result = await ins.save()
    const res = result.toJSON()
    return {
        code:'1001',
        data:res,
        msg:'success'
    }
}
//删除摊主信息
const deleteVendor = async (id) =>{
    const res = await Vendor.destroy({
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
//查找摊主信息
const getAllVendor = async ({page=1,size=10,name,phone,sNo}={})=>{
    const option = {};
    if(name){
        option.name = {
            [Op.like]:`%${name}%`
        }
    }if(phone){
        option.phone = {
            [Op.like]:`%${phone}%`
        }
    }if(sNo){
        option.sNo = {
            [Op.like]:`%${sNo}%`
        }
    }
    const res = await Vendor.findAndCountAll({
        attributes:['id','prestige','name','phone','sNo','sIdPhoto','email'],
        limit:+size,
        offset:(page - 1)* +size,
        where:option
    })
    const result = JSON.parse(JSON.stringify(res.rows))
    // 数组中如果这一项出租，那么摊主id可以获取
    // const info = await getUserDetail(id)
    // 这一项.info = info
    return {
        code:'1001',
        count: res.count,
        data: result
    }
}
const updateVendor = async(upObj,id)=>{
    const obj = pick(upObj,'name','phone','sNo','sIdPhoto','email')
    const rules = {
        name:{
            // presence: {
            //     allowEmpty: false,
            //   },
            type:'string',
            length:{
                minimum:2,
                maximum:10,
                message:'must be length is 2-10'
            }
        },
        phone: {
            // presence: {
            //     allowEmpty: false,
            //   },
            type: "string",
            length: {
                minimum: 11,
                maximum: 11,
                message: "must be length is 11"
            }
        },
        sNo: {
            // presence: {
            //     allowEmpty: false,
            //   },
            type: "string",
            length: {
                minimum: 1,
                maximum: 10,
                message: "must be length is 1-10"
            },
        },
        sIdPhoto: {
            // presence: {
            //     allowEmpty: false,
            //   },
            type: "string",
        },
        email: {
            // presence: {
            //     allowEmpty: false,
            //   },
            type: 'string',
            length: {
                minimum: 5,
                maximum: 20,
                message: "must be length is 5-20"
            }
        }
    };
    try{
        await validate.async(obj,rules)
    }catch(error){
        return{
            code:'1002',
            data:[],
            msg:error
        }
    }
    const res = await Vendor.update(obj,{
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
//改变信誉分
const updatePrestige = async (upObj,id) => {
    const obj = pick(upObj,'prestige')
    const rules = {
        prestige:{
            presence: {
                allowEmpty: false,
              },
            type:"number",
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
    const res = await Vendor.update(obj, {
        where: {
          id: +id
        }
      })
      return{
        code:'1001',
        res:res,
        msg:`已更改${res}条信息`
    }
}
module.exports = {
    addVendor,
    deleteVendor,
    getAllVendor,
    updateVendor,
    updatePrestige
}