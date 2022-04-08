const Apply = require('../../models/modules/Apply')
const validate = require('validate.js')
const {
    Sequelize
} = require("sequelize");
const { pick } = require('../../utils/pick');
const Op = Sequelize.Op;

//新增申请信息
const addApply = async (addObj) => {
    const obj = pick(addObj,'UserId','stallId','time')
    const rules = {
        UserId: {
            presence: {
                allowEmpty: false,
            },
            type: "number",
        },
        stallId: {
            presence: {
                allowEmpty: false,
            },
            type: "number",
        },
        time: {
            presence: {
                allowEmpty: false,
            },
            type: "date"
        }
    }
    try {
        await validate.async(obj, rules)
    } catch (error) {
        return {
            code: '1002',
            data: [],
            msg: error
        }
    }
    const ins = Apply.build(obj)
    const result = await ins.save()
    const res = result.toJSON()

    return {
        code: '1001',
        data: res,
        msg: "success"
    }

}
//删除申请信息
const deleteApply = async (id) => {
    const res = await Apply.destroy({
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
//查找申请信息
const getAllApply = async ({
    page = 1,
    size = 10,
    UserId,
    stallId,
    status,
} = {}) => {
    const option = {}
    if(UserId){
        option.UserId = UserId;
    }
    if (stallId) {
        option.stallId = stallId;
    }
    if (status) {
        option.status = status;
    }
    const res = await Apply.findAndCountAll({
        attributes: ['id', 'UserId', 'stallId', 'status'],
        limit: +size,
        offset: (page - 1) * +size,
        where: option
    })
    const result = JSON.parse(JSON.stringify(res.rows))
    return {
        code: '1001',
        count: res.count,
        data: result
    }
}
//更改申请信息
const updateApply = async (upObj, id) => {
    const obj = pick(upObj,'UserId','stallId','time')
    const rules = {
        UserId: {
            type: "number",
        },
        stallId: {
            type: "number",
        },
        time: {
            type: "date"
        }
    }
    try {
        await validate.async(obj, rules)
    } catch (error) {
        return {
            code: '1002',
            data: [],
            msg: error
        }
    }
    const res = await Apply.update(obj, {
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
    addApply,
    deleteApply,
    updateApply,
    getAllApply
}