const Complain = require('../../models/modules/Complain')
const validate = require('validate.js')
const {Sequelize} = require("sequelize");
const {pick} = require('../../utils/pick')
const Op = Sequelize.Op;
//添加投诉信息
const addComp = async (addObj) => {
    const obj = pick(addObj,'UserId','content','targetId')
    const rules = {
        UserId: {
            presence: {
                allowEmpty: false,
            },
            type: 'number',
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
            type: 'number'
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
    const obj = pick(upObj,'content','UserId');
    const rules = {
        UserId: {
            type: 'number',
        },
        content: {
            type: 'string',
        },
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
} = {})=>{
    const option = {};
    if(UserId){
        option.UserId = UserId
    }if(targetId){
        option.targetId = targetId;
    }
    const res = await Complain.findAndCountAll({
        attributes:['UserId','content','targetId'],
        limit: +size,
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
module.exports = {
    addComp,
    deleteComp,
    updateComp,
    getAllComp,
}