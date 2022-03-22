const express = require('express')
const { handSend } = require('../../utils/handSend')
const router = express.Router()
var svgCaptcha = require('svg-captcha');
//验证码
router.post('/',(req, res) => {
    var c = svgCaptcha.create({
      size: 6,
      ignoreChars: "Oo0i1lL",
      noise: 2,
      color: true
    });
    res.send({
      code:'1001',
      data:c.data,
      msg:'success'
    })
  }
)
module.exports = router