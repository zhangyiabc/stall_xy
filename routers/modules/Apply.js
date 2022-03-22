const express = require('express')
const { addApply, getAllApply, deleteApply, updateApply } = require('../../services/modules/Apply')
const { handSend } = require('../../utils/handSend')
const router = express.Router()
//添加区信息
router.post('/', async (req, res, next) => {
  // console.log(req.query)
  const result = await addApply(req.body)
  handSend(result, res)
})
//查找区信息
router.get('/', async (req, res, next) => {
  const result = await getAllApply(req.query)
  handSend(result, res)
})
//删除区信息
router.delete('/', async (req, res, next) => {
  const result = await deleteApply(req.body.id)
  handSend(result, res)
})
//更改区信息
router.put('/', async (req, res, next) => {
  const result = await updateApply(req.body, req.body.id)
  handSend(result, res)
})

module.exports = router