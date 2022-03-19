const Complain = require('../../models/modules/Complain')
const validate = require('validate.js')
const {Sequelize} = require("sequelize");
const {pick} = require('../../utils/pick')
const Op = Sequelize.Op;
//添加投诉信息
const addComp = async (obj) => {
    const rules = {
        initiator: {
            presence: {
                allowEmpty: false,
            },
            type: 'string',
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
//更改投诉信息
const updateComp = async (upObj, id) => {
    const obj = pick(upObj,'content','initiator');
    const rules = {
        initiator: {
            presence: {
                allowEmpty: false,
            },
            type: 'string',
        },
        content: {
            presence: {
                allowEmpty: false,
            },
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
    return {
        code:'1001',
        data:res,
        msg:'success'
    }
}
//查找投诉信息
const getAllComp = async ({
    page=1,
    size = 10,
    initiator,
    targetId,
} = {})=>{
    const option = {};
    if(initiator){
        option.initiator = {
            [Op.like]: `%${initiator}%`
        }
    }if(targetId){
        option.targetId = targetId;
    }
    const res = await Complain.findAndCountAll({
        attributes:['initiator','content','targetId'],
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