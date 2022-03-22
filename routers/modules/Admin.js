const express = require('express')
const {addAdmin,deleteAdmin,updateAdmin,getAllAdmin,login} = require('../../services/modules/Admin')
const { handSend } = require('../../utils/handSend')
const router = express.Router()


//添加位置信息
router.post('/', async (req, res,next) => {
    const result = await addAdmin(req.body)
    handSend(result, res)
})
//查找位置信息
router.get('/', async (req, res, next) => {
    const result = await getAllAdmin(req.query)
    handSend(result, res)
})
//删除位置信息
router.delete('/',async (req,res,next) => {
    const result = await deleteAdmin(req.body.id)
    handSend(result, res)
})
//更改位置信息
router.put('/',async(req,res,next)=>{
    // console.log(req.query,req.params.id);
    const result = await updateAdmin(req.body,req.body.id)
    handSend(result, res)
})
//登录
router.post('/login',async(req,res,next)=>{
    const result = await login(req.body)
    handSend(result, res)
})
module.exports = router