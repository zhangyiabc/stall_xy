const User = require("../models/modules/User");
const Vendor = require("../models/modules/Vendor");

async function getUserDetail(id){
    const res = await User.findOne({
        attributes:['id','name','nickName','VendorId'],
        where:{
            id: +id,
        },
        include:{
            model:Vendor,
            attributes:['id','prestige','phone','sNo','sIdPhoto','email']
        }
    })
    const result = JSON.parse(JSON.stringify(res.dataValues))
    return {
        data:result,
    }
}
module.exports = {
    getUserDetail
}