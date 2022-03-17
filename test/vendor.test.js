const {addVendor,deleteVendor,getAllVendor,updateVendor} = require('../services/modules/Vendor')

// addVendor({
//     vName:'张毅',
//     phone:'15732448248',
//     sNo:'1811233126',
//     sIdPhoto:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fimages01%2F20210721%2Ffc7ac365ea33457e8a8c174388b18026.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650083041&t=2830c1b651aa2d52e751f97a0888f2c0',
//     email:'1921264695@qq.com'
// }).then(res => {
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// deleteVendor(4).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// getAllVendor({vName:'张毅',phone:'157'}).then(res=>{
//     console.log(res);
// })

// updateVendor({phone:'1340324575'},5).then(res=>{
//     console.log(res)
// })