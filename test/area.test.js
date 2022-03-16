const { addArea, deleteArea, getAllArea, updateArea } = require("../services/modules/Area");

// addArea({
//   name:'文康苑1',
//   describe:"南京煦康苑"
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })


// deleteArea(4).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// getAllArea({  page: 2, size: 1 }).then(res => {
//   console.log(19)
//   console.log(res)
// })

updateArea({ name: 2 }, 2).then(res => {
  console.log(25)
  console.log(res)
}).catch(err => {
  console.log(27)
  console.log(err)
})