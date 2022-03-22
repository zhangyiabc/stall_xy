const Area = require('../../models/modules/Area')
const validate = require('validate.js')
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const {pick} = require('../../utils/pick')
const addArea = async (areaObj) => {
  const obj = pick(areaObj,'name','describe')
  const rules = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
      length: {
        minimum: 1,
        maximum: 10,
        message: "must be length is 1-10",
      },
    },
    describe: {
      presence: undefined,
      type: "string",
      length: {
        minimum: 1,
        maximum: 50,
        message: "must be length is 1-50",
      }
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

  const ins = Area.build(obj)
  const result = await ins.save()
  const res = result.toJSON()

  return {
    code: '1001',
    data: res,
    msg: "success"
  }
}
//删除区信息
const deleteArea = async (id) => {
  const res = await Area.destroy({
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
//查找区信息
const getAllArea = async ({
  page = 1,
  size = 10,
  name
} = {}) => {
  const option = {}
  if (name) {
    option.name = {
      [Op.like]: `%${name}%`
    }
  }
  const res = await Area.findAndCountAll({
    attributes: ['id', 'name', 'describe'],
    limit: +size,
    offset: (page - 1) * +size,
    where: option
  })
  const result = JSON.parse(JSON.stringify(res.rows))
  return {
    code: '1001',
    count: res.count,
    data: {
      data: result,
      size: +size
    }
  }
}
//更新区信息
const updateArea = async (upObj, id) => {
  const obj = pick(upObj,'name','describe')
  const rules = {
    name: {
      presence: undefined,
      type: "string",
      length: {
        minimum: 1,
        maximum: 10,
        message: "must be length is 1-10",
      },
    },
    describe: {
      presence: undefined,
      type: "string",
      length: {
        minimum: 1,
        maximum: 50,
        message: "must be length is 1-50",
      }
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
  const res = await Area.update(obj, {
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
  addArea,
  deleteArea,
  getAllArea,
  updateArea
}


// page = 1
// (page - 1) * size ---- page*size
// [[10],[10],[10],[10],[10]]