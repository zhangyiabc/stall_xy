const Apply = require('../../models/modules/Apply')
const User = require('../../models/modules/User')
const validate = require('validate.js')
const {
    Sequelize
} = require("sequelize");
const { pick } = require('../../utils/pick');
const Stall = require('../../models/modules/Stall');
const Position = require('../../models/modules/Position');
const Area = require('../../models/modules/Area');
const { getOneStall } = require('./Stall');
const Op = Sequelize.Op;
const { sendEmail } = require('../../utils/sendEmail');
const {getUser} = require('../modules/User')

//新增申请信息
const addApply = async (addObj) => {
    console.log(addObj)
    const obj = pick(addObj,'UserId','stallId','time')
    const rules = {
        UserId: {
            presence: {
                allowEmpty: false,
            },
            type: "number",
            //扩展方法
            UserIsExist:true
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
    userStatus
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
    if (userStatus) {
        option.userStatus = userStatus;
    }
    const res = await Apply.findAndCountAll({
        attributes: ['id', 'UserId', 'stallId', 'status','createdAt','userStatus'],
        limit: +size,
        offset: (page - 1) * +size,
        where: option,
        include:{
            model: User,
            attributes:['id','name','nickName']
        },
    })
    const tempData = JSON.parse(JSON.stringify(res.rows))
    const result =await Promise.all( tempData.map(async (item) => {
        const data = await getOneStall({id:item.stallId})
        console.log(data)
        return {
            ...item,
            stallData:data.data
        }
    }))
    return {
        code:'1001',
        count: res.count,
        data: result
      }
}
//更改申请信息
const updateApply = async (upObj, id) => {
    const obj = pick(upObj,'UserId','stallId','time','status','userStatus')
    const rules = {
        UserId: {
            type: "number",
        },
        stallId: {
            type: "number",
        },
        time: {
            type: "date"
        },
        status: {
            type: "boolean"
        },
        userStatus: {
            type:"number"
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

    if(obj.userStatus===1){
        let str = `<h1 style="color:green">恭喜您摊位申请成功</h1>`
        getOneStall({id}).then(r=>{
            str+=`<h3 style="color:green">恭喜您 ${r.data.Position.Area.name}区的${r.data.Position.name}位置申请成功</h3>`
            getUser({id:r.data.UserId}).then(r=>{
                sendEmail(`${r.data.Vendor.email}`,'摊位申请通知',str)
            })
        })
    }else if(obj.userStatus === 2){
        let str = `<h1 style="color:red">抱歉，您的摊位申请已被拒绝</h1>`
        getOneStall({id}).then(r=>{
            str+=`<h3 style="color:red">对不起 ${r.data.Position.Area.name}区的${r.data.Position.name}位置申请失败</h3>`
            getUser({id:r.data.UserId}).then(r=>{
                sendEmail(`${r.data.Vendor.email}`,'摊位申请通知',str)
            })
        })
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