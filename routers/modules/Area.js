const express = require('express')
const { addArea, getAllArea } = require('../../services/modules/Area')
const router = express.Router()

router.post('/', async (req, res, next) => {
  // console.log(req.body)
  const result = await addArea(req.body)
  if (result.code == '1001') {
    res.send(result)
  }
})

router.get('/', async (req, res, next) => {
  const result = await getAllArea(req.query)
  if (result.code == '1001') {
    res.send(result)
  }
})

router.get('/:id',async (req,res) => {
  console.log(req.params.id)
})

module.exports = router