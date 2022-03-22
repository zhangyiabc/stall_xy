/**
 * 
 * @param {*} respData 需要返回给前端的数据
 * @param {*} res res对象
 */
const handSend = (respData,res) => {
  const {code} = respData
  if(code == '1001'){
    res.status(200)
    res.send(respData)
  }else if(code == '1002'){
    res.status(400)
    res.send(respData)
  }else if(code=='1003'){
    res.status(401)
    res.send(respData)
  }
}

module.exports = {
  handSend
}