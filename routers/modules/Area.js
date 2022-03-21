const express = require('express')
const { addArea, getAllArea, deleteArea, updateArea } = require('../../services/modules/Area')
const { handSend } = require('../../utils/handSend')
const router = express.Router()
//添加区信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addArea(req.query)
  handSend(result, res)
})
//查找区信息
router.get('/', async (req, res, next) => {
  const result = await getAllArea(req.query)
  handSend(result, res)
})
//删除区信息
router.delete('/:id',async (req,res,next) => {
  const result = await deleteArea(req.params.id)
  handSend(result, res)
})
//更改区信息
router.put('/:id',async(req,res,next)=>{
  const result = await updateArea(req.query,req.params.id)
  handSend(result, res)
})

module.exports = router