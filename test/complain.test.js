const {addComp,deleteComp,updateComp,getAllComp} = require('../services/modules/Complain')
addComp({
    UserId:4,
    content:'这是一个投诉信息',
    targetId:5
}).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})

// updateComp({
//     targetId:1,
//     initiator:'张毅',
//     content:'投诉信息'
// },1).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// getAllComp({targetId:5}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// deleteComp(1).then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err);
// })