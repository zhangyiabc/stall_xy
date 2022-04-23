const Complain = require('../../models/modules/Complain')
const validate = require('validate.js')
const {Sequelize} = require("sequelize");
const {pick} = require('../../utils/pick');
const {getUser} = require('./User')
const User = require('../../models/modules/User');
const Op = Sequelize.Op;
//添加投诉信息
const addComp = async (addObj) => {
    const obj = pick(addObj,'UserId','content','targetId','photo')
    const rules = {
        UserId: {
            presence: {
                allowEmpty: false,
            },
            type: 'number',
            //扩展方法
            UserIsExist:true
        },
        content: {
            presence: {
                allowEmpty: false,
            },
            type: 'string',
        },
        targetId: {
            presence: {
                allowEmpty: false,
            },
            type: 'number',
            UserIsExist:true
        },
        photo:{
            presence:{
                allowEmpty:false,
            },
            type:'string'
        }
    }
    try {
        await validate.async(obj, rules);
    } catch (error) {
        return {
            code: '1002',
            data: [],
            msg: error
        }
    }
    const ins = Complain.build(obj)
    const result = await ins.save()
    const res = result.toJSON()
    return {
        code: '1001',
        data: res,
        msg: "success"
    }
}
//删除投诉信息
const deleteComp = async (id) => {
    const res = await Complain.destroy({
        where: {
            id: +id
        }
    })
    return {
        code:'1001',
        data:res,
        msg:`已删除${res}条数据`
    }
}
//更改投诉信息
const updateComp = async (upObj, id) => {
    const obj = pick(upObj,'content','targetId','photo','status','userSee');
    const rules = {
        targetId: {
            type: 'number',
        },
        content: {
            type: 'string',
        },
        photo:{
            type:'string'
        },
        status:{
            type:'boolean'
        },
        userSee:{
            type:'number'
        }
    }
    try {
        await validate.async(obj, rules);
    } catch (error) {
        return {
            code: '1002',
            data: [],
            msg: error
        }
    }
    const res = await Complain.update(obj, {
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
//查找投诉信息
const getAllComp = async ({
    page=1,
    size = 10,
    UserId,
    targetId,
    status,
    userSee
} = {})=>{
    const option = {};
    if(UserId){
        option.UserId = UserId
    }if(targetId){
        option.targetId = targetId
    }if(status){
        option.status = status
    }if(userSee){
        option.userSee = userSee
    }
    const res = await Complain.findAndCountAll({
        attributes:['id','UserId','content','status','targetId','photo','createdAt','userSee'],
        limit: +size,
        offset: (page - 1) * +size,
        where: option,
        include:[{
            model:User,
            attributes:['name','nickName']
        }]
    })
    const tempData = JSON.parse(JSON.stringify(res.rows))
    const result =await Promise.all( tempData.map(async (item) => {
        const data = await getUser({id:item.targetId})
        return {
            ...item,
            userData:data.data
        }
    }))
    return {
        code:'1001',
        count: res.count,
        data: result
      }
}
module.exports = {
    addComp,
    deleteComp,
    updateComp,
    getAllComp,
}