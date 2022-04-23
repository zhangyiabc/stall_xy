const Stall = require('../../models/modules/Stall')
const validate = require('validate.js')
const Position = require('../../models/modules/Position')
const Area = require('../../models/modules/Area')

const {
  Sequelize
} = require("sequelize");
const User = require('../../models/modules/User');
const Op = Sequelize.Op;
const {
  getUserDetail
} = require('../../utils/getUserDetail');
const {
  pick
} = require('../../utils/pick');
//添加一个摊位信息
const addStall = async (addObj) => {
  const obj = pick(addObj, 'PositionId', 'AreaId', 'toDay')
  const rules = {
    status: {
      type: 'boolean',

    },
    PositionId: {
      presence: {
        allowEmpty: false,
      },
      type: 'number',
    },
    AreaId: {
      presence: {
        allowEmpty: false,
      },
      type: 'number',
    },
    toDay: {
      type: 'string'
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
  const ins = Stall.build(obj)
  const result = await ins.save()
  const res = result.toJSON()
  return {
    code: '1001',
    data: res,
    msg: "success"
  }
}
//删除一个摊位信息
const deleteStall = async (id) => {
  const res = await Stall.destroy({
    where: {
      id: +id
    }
  })
  return {
    code: '1001',
    data: res,
    msg: `已删除${res}条数据`
  }
}
//查找摊位信息
const getAllStall = async ({
  page = 1,
  size = 10,
  status,
  PositionId,
  AreaId,
  UserId
} = {}) => {
  const option = {}
  status = status == 'true' ? true : false
  if (typeof status == 'boolean') {
    option.status = status;
  }
  if (PositionId) {
    option.PositionId = PositionId;
  }
  if (AreaId) {
    option.AreaId = AreaId;
  }
  if (UserId) {
    option.UserId = UserId;
  }
  const res = await Stall.findAndCountAll({
    attributes: ['id', 'status', 'PositionId', 'AreaId', 'toDay', 'UserId'],
    limit: +size,
    offset: (page - 1) * +size,
    where: option,
    include:{
      model:Position,
      attributes:['id','name','photo'],
      include:{
        model:Area,
        attributes:['id','name']
      }
    }
  })
  const result = JSON.parse(JSON.stringify(res.rows))
  //如果摊位已经出租，则获取摊主信息
  for (let i = 0; i < res.count; i++) {
    if (result[i].status === true) {
      const info = await getUserDetail(result[i].UserId);
      result[i].info = info;
    }
  }
  return {
    code: '1001',
    count: res.count,
    data: result
  }
}
//修改摊位信息
const updateStall = async (upObj, id) => {
  console.log(upObj)
  const obj = pick(upObj, 'status', 'PositionId', 'AreaId', 'toDay', 'UserId')
  const rules = {
    status: {
      type: 'boolean',
    },
    PositionId: {
      type: 'number',
    },
    AreaId: {
      type: 'number',
    },
    toDay: {
      type: 'string'
    },
    UserId: {
      type: 'number',
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
  const res = await Stall.update(obj, {
    where: {
      id: +id
    }
  })
  return {
    code: '1001',
    res: res,
    msg: `已更改${res}条信息`
  }
}
// 获取单个摊位信息
const getOneStall = async ({
  id
} = {}) => {
  const res = await Stall.findOne({
    attributes: ['id', 'toDay', 'createdAt', 'status', 'PositionId', 'AreaId', 'UserId'],
    where: {
      id: +id,
    },
    include: {
      model: Position,
      attributes: ['id', 'name', 'photo'],
      include: {
        model: Area,
        attributes: ['id', 'name', 'describe'],
      }
    }
  })
  const result = JSON.parse(JSON.stringify(res.dataValues))
  return {
    code: '1001',
    data: result
  }
}
//根据位置id查找摊位信息
const getStallByPositionId = async ({PositionId}={}) =>{
  const res = await Stall.findOne({
    attributes:['id', 'toDay', 'createdAt', 'status', 'PositionId', 'AreaId', 'UserId'],
    where:{
      PositionId
    }
  })
  const result = JSON.parse(JSON.stringify(res.dataValues))
  return {
    code:'1001',
    data:result
  }
}
module.exports = {
  addStall,
  deleteStall,
  updateStall,
  getAllStall,
  getOneStall,
  getStallByPositionId
}