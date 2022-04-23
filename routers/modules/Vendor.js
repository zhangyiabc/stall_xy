const express = require('express')
const { addVendor, getAllVendor, deleteVendor, updateVendor, updatePrestige } = require('../../services/modules/Vendor')
const { handSend } = require('../../utils/handSend')
const router = express.Router()
//添加摊主信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addVendor(req.query)
  handSend(result, res)
})
//查找摊主信息
router.get('/', async (req, res, next) => {
  const result = await getAllVendor(req.query)
  handSend(result, res)
})
//删除摊主信息
router.delete('/',async (req,res) => {
  const result = await deleteVendor(req.body.id)
  handSend(result, res)
})
//更改摊主信息
router.put('/',async(req,res)=>{
  const result = await updateVendor(req.body,req.body.id)
    handSend(result, res)
})
//更改信誉分
router.put('/prestige',async(req,res)=>{
  const result = await updatePrestige(req.body,req.body.id)
    handSend(result, res)
})

module.exports = router