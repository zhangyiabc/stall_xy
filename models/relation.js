const User = require('./modules/User')
const Vendor = require('./modules/Vendor')
const Area = require('./modules/Area')
const Position = require('./modules/Position')
const Stall = require('./modules/Stall')
const Apply = require('./modules/Apply')
const Complain = require('./modules/Complain')

//一个用户对应一个摊主信息，一个摊主信息对应一个用户
// User.hasOne(Vendor);
// Vendor.belongsTo(User);
Vendor.hasOne(User)
User.belongsTo(Vendor)
//一个地区对应多个位置信息，一个位置信息对应一个地区
Area.hasMany(Position)
Position.belongsTo(Area)
//一个摊主信息对应多个摊位信息，一个摊位信息对应一个摊主信息
// User.hasMany(Stall)
// Stall.belongsTo(User)
// 一个摊位信息对应一个位置信息，一个位置信息对应一个摊位信息
Position.hasOne(Stall)
Stall.belongsTo(Position)
//一个摊位信息对应一个区信息，一个区信息对应多个摊位信息
Area.hasMany(Stall)
Stall.belongsTo(Area)
//一个申请信息对应一个用户，一个用户对应多个申请信息
User.hasMany(Apply)
Apply.belongsTo(User)
//一个投诉信息对应一个用户，一个用户对应多个投诉信息
User.hasMany(Complain)
Complain.belongsTo(User)
