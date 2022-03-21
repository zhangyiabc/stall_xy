const express = require('express');
const { addArea } = require('../services/modules/Area');
const app = express()

// post请求的两种方式进行解析
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());

// app.use((req, res, next) => {
//   // console.log(req.query)  //这是发送的值
//   // console.log(req.path) // host后面的东西 /baidu 
//   // console.log(req.params)
//   // console.log(req.query) get
//   console.log(req.body)
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

app.use('/api/area',require('./modules/Area'))
app.use('/api/apply',require('./modules/Apply'))
app.use('/api/admin',require('./modules/Admin'))
app.use('/api/comp',require('./modules/Complain'))
app.use('/api/position',require('./modules/Position'))
app.use('/api/stall',require('./modules/Stall'))
app.use('/api/user',require('./modules/User'))
app.use('/api/vendor',require('./modules/Vendor'))


app.listen(10086,() => {
  console.log('已开放10086端口')
})