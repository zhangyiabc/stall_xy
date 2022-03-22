const validate = require('validate.js')
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const Position = require('../../models/modules/Position');
const { pick } = require('../../utils/pick');
const Area = require('../../models/modules/Area')
// 新增一个位置信息
const addPosition = async (positionObj) => {
  const obj = pick(positionObj, 'name', 'photo', 'AreaId')
  const rules = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimum: 1,
        maximum: 20,
        message: "must be length is 1-20"
      },
    },
    photo: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    AreaId: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      // 拓展的方法
      AreaIsExist: true,
    }
  }
  try {
    await validate.async(obj, rules);
  } catch (error) {
    return {
      code: '2',
      data: [],
      msg: error
    }
  }

  const ins = Position.build(obj)
  const result = await ins.save()
  return {
    code: "1001",
    msg: "success",
    data: result.toJSON()
  }
}
//删除一个位置信息
const deletePosition = async(id) =>{
  const res = await Position.destroy({
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
//查找位置信息
const getAllPosition = async ({ page = 1, size = 10, name, AreaId } = {}) => {
  const options = {}
  if (name) {
    options.name = {
      [Op.like]: `%${name}%`
    }
  }
  if (AreaId) {
    options.AreaId = AreaId
  }
  const res = await Position.findAndCountAll({
    where: options,
    limit: +size,
    offset: (page - 1) * +size,
    attributes: ['id', 'name', 'photo', 'createdAt', 'AreaId'],
    include: [
      {
        model: Area,
        attributes: ['id', 'name', 'describe'],
      }
    ]
  })
  const result = JSON.parse(JSON.stringify(res.rows))
  return {
    code:"1001",
    const: res.count,
    data: result
  }
}
//更新位置信息
const updatePosition = async(upObj,id)=>{
  const obj = pick(upObj,'name','photo','AreaId')
  const rules={
    name: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimum: 1,
        maximum: 20,
        message: "must be length is 1-20"
      },
    },
    photo: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    AreaId: {
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      // 拓展的方法
      AreaIsExist: true,
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
const res = await Position.update(obj,{
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
module.exports = {
  addPosition,
  getAllPosition,
  updatePosition,
  deletePosition
}