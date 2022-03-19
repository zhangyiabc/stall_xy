const {addApply,deleteApply,updateApply,getAllApply} = require('../services/modules/Apply')
const date = new Date()
// addApply({name:'mxy',stallId:2,time:date}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err)
// })

// updateApply({stallId:3,time:date},1).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// getAllApply({name:'mxy'}).then(res=>{
//     console.log(res);
// })

deleteApply(1).then(res=>{
    console.log(res);
})