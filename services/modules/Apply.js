const Apply = require('../../models/modules/Apply')
const validate = require('validate.js')
const {
    Sequelize
} = require("sequelize");
const Op = Sequelize.Op;

//新增申请信息
const addApply = async (obj) => {
    const rules = {
        name: {
            presence: {
                allowEmpty: false,
            },
            type: "string",
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
//查找申请信息
const getAllApply = async ({
    page = 1,
    size = 10,
    name,
    stallId,
    status,
} = {}) => {
    const option = {}
    if (name) {
        option.name = {
            [Op.like]: `%${name}%`
        }
    }
    if (stallId) {
        option.stallId = stallId;
    }
    if (status) {
        option.status = status;
    }
    const res = await Apply.findAndCountAll({
        attributes: ['id', 'name', 'stallId', 'status'],
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
const updateApply = async (obj, id) => {
    const rules = {
        name: {
            type: "string",
        },
        stallId: {
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
    const res = await Apply.update(obj, {
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
    addApply,
    deleteApply,
    updateApply,
    getAllApply
}