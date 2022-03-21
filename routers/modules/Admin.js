const express = require('express')
const {addAdmin,deleteAdmin,updateAdmin,getAllAdmin,login} = require('../../services/modules/Admin')
const router = express.Router()

//添加位置信息
router.post('/', async (req, res,next) => {
    const result = await addAdmin(req.query)
    if (result.code == '1001') {
        res.send(result)
    }
})
//查找位置信息
router.get('/', async (req, res, next) => {
    const result = await getAllAdmin(req.query)
    if (result.code == '1001') {
        res.send(result)
    }
})
//删除位置信息
router.delete('/:id',async (req,res,next) => {
    const result = await deleteAdmin(req.params.id)
    if(result.code == '1001'){
      res.send(result)
    }
})
//更改位置信息
router.put('/:id',async(req,res,next)=>{
    // console.log(req.query,req.params.id);
    const result = await updateAdmin(req.query,req.params.id)
    res.send(result)
})
//登录
router.post('/login',async(req,res,next)=>{
    const result = await login(req.query)
    res.send(result)
})
module.exports = router