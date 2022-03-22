const express = require('express')
const { addComp,getAllComp,deleteComp,updateComp } = require('../../services/modules/Complain')
const { handSend } = require('../../utils/handSend')
const router = express.Router()
//添加区信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addComp(req.body)
  console.log(result)
  handSend(result, res)
})
//查找区信息
router.get('/', async (req, res, next) => {
  const result = await getAllComp(req.query)
  handSend(result, res)
})
//删除区信息
router.delete('/',async (req,res) => {
  const result = await deleteComp(req.body.id)
  handSend(result, res)
})
//更改区信息
router.put('/',async(req,res)=>{
  const result = await updateComp(req.body,req.body.id)
  handSend(result, res)
})

module.exports = router