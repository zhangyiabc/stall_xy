const express = require('express')
const { addApply, getAllApply, deleteApply, updateApply } = require('../../services/modules/Apply')
const router = express.Router()
//添加区信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addApply(req.query)
  console.log(result)
  if (result.code == '1001') {
    res.send(result)
  }else if(result.code == '1002'){
    res.send({code:'1002',err:result.msg,msg:'fail'})
  }
})
//查找区信息
router.get('/', async (req, res, next) => {
  const result = await getAllApply(req.query)
  if (result.code == '1001') {
    res.send(result)
  }
})
//删除区信息
router.delete('/:id',async (req,res,next) => {
  const result = await deleteApply(req.params.id)
  if(result.code == '1001'){
    res.send(result)
  }
})
//更改区信息
router.put('/:id',async(req,res,next)=>{
  const result = await updateApply(req.query,req.params.id)
  if(result.code == '1001'){
    res.send(result)
  }
})

module.exports = router