const {addStall,deleteStall,updateStall,getAllStall,getStallByPositionId} = require('../services/modules/Stall')
const date = new Date()

// addStall({positionId:1,areaId:3,toDay:date}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// updateStall({status:true,UserId:5,positionId:1,areaId:3,UserId:5},2).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// getAllStall({UserId:5}).then(res=>{
//     console.log(res);
//     console.log(res.data[0].info)
// })

// deleteStall(1).then(res=>{
//     console.log(res);
// })
getStallByPositionId({
  PositionId:3
}).then(r=>{
  console.log(r)
})