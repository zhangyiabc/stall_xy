const express = require('express');
const { addArea } = require('../services/modules/Area');
const app = express()
const path = require('path')

// 访问静态资源
const staticDir = path.resolve(__dirname, '../public')
app.use(express.static(staticDir))
// post请求的两种方式进行解析
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());

// app.use((req, res, next) => {
// console.log(req.query)  //这是发送的值
// console.log(req.path) // host后面的东西 /baidu 
// console.log(req.params)
// console.log(req.query) get
// console.log(req.body)
// req.body = 123
// console.log(req.body)
// })

// app.use(function(req,res,next) {
//   req.zyd="zhangyida"
//   next()
// })
// app.use(function(req,res,next) {
//   console.log(req.zyd)
//   req.zyd="mxy"
//   next()
// })
// app.use(function(req,res,next){
//   console.log(req.zyd)
// })


//二维码
app.use('/api/captcha',require('./modules/Captcha') )

//文件上传
app.use('/api/upload', require('./modules/UpFile'))


app.use('/api/area', require('./modules/Area'))
app.use('/api/apply', require('./modules/Apply'))
app.use('/api/admin', require('./modules/Admin'))
app.use('/api/comp', require('./modules/Complain'))
app.use('/api/position', require('./modules/Position'))
app.use('/api/stall', require('./modules/Stall'))
app.use('/api/user', require('./modules/User'))
app.use('/api/vendor', require('./modules/Vendor'))


app.listen(8686, () => {
  console.log('已开放8686端口')
})