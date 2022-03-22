const express = require('express')
const { handSend } = require('../../utils/handSend')
const router = express.Router()
const multer = require('multer')
const path = require('path')

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
router.put('/',upload.single('mxy'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    // 复制 req.body.name 文件夹下
    // 删除这个文件
    res.send({
        code:'1001',
        data:`localhost:10086/upload/${req.file.filename}`,
        msg:'1001'
    })
  })

  module.exports = router