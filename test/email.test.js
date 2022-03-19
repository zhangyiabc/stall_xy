const { sendEmail } = require("../utils/sendEmail")
let code = 123456
let str = `<h1 style="color:red">${code}</h1>`
sendEmail('1921264695@qq.com','这是一个主题',str)