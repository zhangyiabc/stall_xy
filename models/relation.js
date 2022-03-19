const User = require('./modules/User')
const Vendor = require('./modules/Vendor')
//一个用户对应一个摊主，一个摊主对应一个用户
User.hasOne(Vendor);
Vendor.belongsTo(User);
const Area = require('./modules/Area')
const Position = require('./modules/Position')

Area.hasMany(Position)
Position.belongsTo(Area)

