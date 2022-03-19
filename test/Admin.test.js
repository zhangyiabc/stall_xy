const Admin = require('../models/modules/Admin')
const {addAdmin,getAllAdmin,updateAdmin,deleteAdmin} = require('../services/modules/Admin')

// addAdmin({
//     name:'admin',
//     password:'admin'
// }).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// getAllAdmin({name:'admi'}).then(res=>{
//     console.log(res);
// })

// updateAdmin({password:'admin0'},1).then(res=>{
//     console.log(res);
// })

deleteAdmin(1).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err);
})