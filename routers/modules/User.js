const express = require('express')
const {addUser,getAllUser,deleteUser,updateUser,login} = require('../../services/modules/User')
const router = express.Router()
//添加用户信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addUser(req.query)
    if(result.code==='1001'){
      res.send({
        code:'1001',
        data:[],
        msg:'success'
    })
    }
})
//查找用户信息
router.get('/', async (req, res, next) => {
  const result = await getAllUser(req.query)
  if(result.count!=0){
    res.send({
      code:'1001',
      data:result,
      msg:'success'})
  }else{
    res.send({
      code:'1002',
      data:[],
      msg:'not found'
    })
  }
    
  
})
//删除用户信息
router.delete('/:id',async (req,res) => {
  const result = await deleteUser(req.params.id)
  if(result.code == '1001'){
    res.send(result)
  }
})
//更改用户信息
router.put('/:id',async(req,res)=>{
  const result = await updateUser(req.query,req.params.id)
    res.send(result)
})
//用户登录
router.post('/login', async (req, res, next) => {
  // console.log(req.query)
  const result = await login(req.query)
      res.send(result)
})
module.exports = router