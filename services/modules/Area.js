const Area = require('../../models/modules/Area')
const validate = require('validate.js')
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const addArea = async (areaObj) => {
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
    await validate.async(areaObj, rules)
  } catch (error) {
    return {
      code: '2',
      data: [],
      msg: error
    }
  }

  const ins = Area.build(areaObj)
  const result = await ins.save()
  const res = result.toJSON()

  return {
    code: '1001',
    data: res,
    msg: "success"
  }
}

const deleteArea = async (id) => {
  const res = await Area.destroy({
    where: {
      id: +id
    }
  })
  console.log(res)
}

const getAllArea = async ({ page = 1, size = 10, name } = {}) => {
  console.log(name)
  const option = {}
  if (name) {
    option.name = {
      [Op.like]: `%${name}%`
    }
  }
  const res = await Area.findAndCountAll({
    attributes: ['id','name', 'describe'],
    limit: +size,
    offset: (page - 1) * +size,
    where: option
  })
  const result = JSON.parse(JSON.stringify(res.rows))
  return {
    count: res.count,
    data: result
  }
}

const updateArea = async (obj,id) => {
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
      code: '2',
      data: [],
      msg: error
    }
  }
  const res = await Area.update(obj,{
    where:{
      id:+id
    }
  })
  return res
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