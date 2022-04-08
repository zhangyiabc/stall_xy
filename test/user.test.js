const {addUser,deleteUser,updateUser,getAllUser,login,getUser} = require('../services/modules/User')
// addUser({
//     name:'yxq123456',
//     password:'123456',
//     nickName:"强叔"
// }).then(res=>{
//     console.log(res);
// })

// deleteUser(1).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// updateUser({name:'mxy123456',password:'xy123456'},3).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// getAllUser({name:'6',nickName:'叔'}).then(res=>{
//     console.log(res);
//     console.log(res.data[0].Vendor)
// }).catch(err=>{
//     console.log(err);
// })

// login('yxq123456','123456').then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

getUser({id:5}).then(res=>{
    console.log(res);
    console.log(res.data[0].Vendor)
}).catch(err=>{
    console.log(err);
})