const express = require('express')
const { addPosition, getAllPosition, deletePosition, updatePosition } = require('../../services/modules/Position')
const { handSend } = require('../../utils/handSend')
const router = express.Router()

//添加区信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addPosition(req.body)
  handSend(result, res)
})
//查找区信息
router.get('/', async (req, res, next) => {
  const result = await getAllPosition(req.query)
  handSend(result, res)
})
//删除区信息
router.delete('/',async (req,res) => {
  const result = await deletePosition(req.body.id)
  handSend(result, res)
})
//更改区信息
router.put('/',async(req,res)=>{
  const result = await updatePosition(req.body,req.body.id)
  handSend(result, res)
})

module.exports = router