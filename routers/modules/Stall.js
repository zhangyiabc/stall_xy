const express = require('express')
const {addStall,deleteStall,getAllStall,updateStall} = require('../../services/modules/Stall')
const { handSend } = require('../../utils/handSend')
const router = express.Router()

//添加区信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addStall(req.body)
  handSend(result, res)
})
//查找区信息
router.get('/', async (req, res, next) => {
  const result = await getAllStall(req.query)
  handSend(result, res)
})
//删除区信息
router.delete('/',async (req,res) => {
  const result = await deleteStall(req.body.id)
  handSend(result, res)
})
//更改区信息
router.put('/',async(req,res)=>{
  const result = await updateStall(req.body,req.body.id)
  handSend(result, res)
})

module.exports = router