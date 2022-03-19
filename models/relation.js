const User = require('./modules/User')
const Vendor = require('./modules/Vendor')
const Area = require('./modules/Area')
const Position = require('./modules/Position')
const Stall = require('./modules/Stall')
//一个用户对应一个摊主信息，一个摊主信息对应一个用户
// User.hasOne(Vendor);
// Vendor.belongsTo(User);
Vendor.hasOne(User)
User.belongsTo(Vendor)
//一个地区对应多个位置信息，一个位置信息对应一个地区
Area.hasMany(Position)
Position.belongsTo(Area)
//一个摊主信息对应多个摊位信息，一个摊位信息对应一个摊主信息
User.hasMany(Stall)
Stall.belongsTo(User)

