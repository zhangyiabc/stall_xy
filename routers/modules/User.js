const express = require('express')
const {addUser,getAllUser,deleteUser,updateUser,login} = require('../../services/modules/User')
const { handSend } = require('../../utils/handSend')
const router = express.Router()

//添加用户信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addUser(req.body)
    handSend(result, res)
})
//查找用户信息
router.get('/', async (req, res, next) => {
  const result = await getAllUser(req.query)
  handSend(result, res)
    
  
})
//删除用户信息
router.delete('/',async (req,res) => {
  const result = await deleteUser(req.body.id)
  handSend(result, res)
})
//更改用户信息
router.put('/',async(req,res)=>{
  const result = await updateUser(req.body,req.body.id)
    handSend(result, res)
})
//用户登录
router.post('/login', async (req, res, next) => {
  // console.log(req.query)
  const result = await login(req.body)
      handSend(result, res)
})
module.exports = router