const Area = require('./modules/Area')
const Position = require('./modules/Position')

Area.hasMany(Position)
Position.belongsTo(Area)

