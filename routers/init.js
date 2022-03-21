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


var svgCaptcha = require('svg-captcha');



app.use('/api/captcha', (req, res) => {
  var c = svgCaptcha.create({
    size: 6,
    ignoreChars: "Oo0i1lL",
    noise: 2,
    color: true
  });
  res.send(c.data)
})

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/upload'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1500 * 1024
  },
  fileFilter(req, file, cb) {
    // 根据cb函数的参数来进行文件的过滤
    const whitelist = ['.png', '.jpg', '.jpeg', '.gif']
    const extname = path.extname(file.originalname)
    if (whitelist.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error(`your ext name of ${extname} is not support`));
    }
  }
})

app.use('/api/upload', upload.single('mxy'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  // 复制 req.body.name 文件夹下
  // 删除这个文件
  res.send(`localhost:10086/upload/${req.file.filename}`)
})


app.use('/api/area', require('./modules/Area'))
app.use('/api/apply', require('./modules/Apply'))
app.use('/api/admin', require('./modules/Admin'))
app.use('/api/comp', require('./modules/Complain'))
app.use('/api/position', require('./modules/Position'))
app.use('/api/stall', require('./modules/Stall'))
app.use('/api/user', require('./modules/User'))
app.use('/api/vendor', require('./modules/Vendor'))


app.listen(10086, () => {
  console.log('已开放10086端口')
})