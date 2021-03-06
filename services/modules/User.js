const User = require('../../models/modules/User')
const validate = require('validate.js')
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { pick } = require('../../utils/pick');
const { addVendor } = require('./Vendor');
const Vendor = require('../../models/modules/Vendor')
//用户操作
const addUser = async (userObj) => {
  const obj = pick(userObj, 'name', 'password', 'nickName')
  const rules = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimum: 5,
        maximum: 15,
        message: 'must be length is 5-15',
      }
    },
    password: {
      presence: {
        allowEmpty: false,
      },
      type: 'string',
      length: {
        minimum: 5,
        maximum: 20,
        message: 'must be length is 5-20',
      },
    },
    nickName: {
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
  // 创建一条为空的
  await addVendor().then(res => {
    obj.VendorId = res.data.id;
  })
  // obj.VedorId =  res.id 
  const ins = User.build(obj)
  const result = await ins.save()
  const res = result.toJSON()
  return {
    code: '1001',
    data: res,
    msg: 'success',
  }
}

const deleteUser = async (id) => {
  const res = await User.destroy({
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
//获取所有用户
const getAllUser = async ({
  page = 1,
  size = 10,
  name,
  nickName
} = {}) => {
  const option = {}
  //对用户名和昵称模糊查询
  if (name) {
    option.name = {
      [Op.like]: `%${name}%`
    }
  } if (nickName) {
    option.nickName = {
      [Op.like]: `%${nickName}%`
    }
  }
  const res = await User.findAndCountAll({
    attributes: ['id', 'name', 'password', 'nickName', 'VendorId'],
    limit: +size,
    offset: (page - 1) * +size,
    where: option,
    include: {
      model: Vendor,
      attributes: ['id', 'prestige', 'phone', 'sNo', 'sIdPhoto', 'email']
    }
  })
  const result = JSON.parse(JSON.stringify(res.rows))
  return {
    code: '1001',
    count: res.count,
    data: result
  }
}
// 获取单个用户信息
const getUser = async ({ id } = {}) => {
  const res = await User.findOne({
    attributes: ['id', 'name', 'nickName', 'VendorId'],
    where: {
      id: +id,
    },
    include: {
      model: Vendor,
      attributes: ['id', 'prestige', 'phone', 'sNo', 'sIdPhoto', 'email']
    }
  })
  const result = JSON.parse(JSON.stringify(res.dataValues))
  return {
    code: '1001',
    data: result
  }
}



//更新用户信息
const updateUser = async (upObj, id) => {
  const obj = pick(upObj, 'password', 'nickName');
  const rules = {
    password: {
      type: 'string',
      length: {
        minimum: 6,
        maximum: 20,
        message: 'must be length is 6-20',
      },
    },
    nickName: {
      type: "string",
      length: {
        minimum: 1,
        maximum: 10,
        message: "must be length is 1-10",
      },
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

  const res = await User.update(obj, {
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
//res = await  User.findOne({name:name,password})
const login = async ({ name, password } = {}) => {
  if (!name || !password) {
    return {
      code: '1002',
      data: [],
      msg: 'name or password could not be null!'
    }
  }
  const res = await User.findOne({ where: { name, password } });
  const result = res.toJSON()
  delete result.password
  if (res === null) {
    return {
      code: '1003',
      data: [],
      msg: 'not find'
    }
  } else {
    return {
      data: result,
      code: '1001',
      msg: 'success'
    }
  }
}


module.exports = {
  addUser,
  deleteUser,
  getAllUser,
  updateUser,
  login,
  getUser,
}