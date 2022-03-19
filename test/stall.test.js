const {addStall,deleteStall,updateStall,getAllStall} = require('../services/modules/Stall')
const date = new Date()

// addStall({positionId:1,areaId:3,toDay:date}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// updateStall({status:true,UserId:5,positionId:1,areaId:3},1).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// getAllStall({opsitionId:1}).then(res=>{
//     console.log(res);
// })

deleteStall(1).then(res=>{
    console.log(res);
})