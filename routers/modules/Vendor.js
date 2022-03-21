const express = require('express')
const { addVendor, getAllVendor, deleteVendor, updateVendor } = require('../../services/modules/Vendor')
const router = express.Router()
//添加摊主信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addVendor(req.query)
  console.log(result)
  if (result.code == '1001') {
    res.send(result)
  }else if(result.code == '1002'){
    res.send({code:'1002',err:result.msg,msg:'fail'})
  }
})
//查找摊主信息
router.get('/', async (req, res, next) => {
  const result = await getAllVendor(req.query)
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
//删除摊主信息
router.delete('/:id',async (req,res) => {
  const result = await deleteVendor(req.params.id)
  if(result.code == '1001'){
    res.send(result)
  }
})
//更改摊主信息
router.put('/:id',async(req,res)=>{
  const result = await updateVendor(req.query,req.params.id)
    res.send(result)
  
})

module.exports = router