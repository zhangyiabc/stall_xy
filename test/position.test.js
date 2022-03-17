const { addPosition, getAllPosition } = require('../services/modules/Position')
// addPosition({
//   name: "文康苑 区下的--位置1",
//   photo: "https://img2020.cnblogs.com/blog/1913594/202101/1913594-20210105101729486-740019723.png",
//   AreaId: 3
// }).then(res => {
//   console.log(res)
// })
// addPosition({
//   name: "文康苑 区下的--位置2",
//   photo: "https://img2020.cnblogs.com/blog/1913594/202101/1913594-20210105101729486-740019723.png",
//   AreaId: 3
// }).then(res => {
//   console.log(res)
// })

// addPosition({
//   name: "文康苑 区下的--位置3",
//   photo: "https://img2020.cnblogs.com/blog/1913594/202101/1913594-20210105101729486-740019723.png",
//   AreaId: 3
// }).then(res => {
//   console.log(res)
// })

// getAllPosition({name:'文康苑'}).then(res =>{
//   // console.log(res)
//   console.log(res.data[0])
//   console.log(res.data[0]['Area'])
// })

getAllPosition({ AreaId: 2 }).then(res => {
  // console.log(res)
  console.log(res.data)
  console.log(res.data[0]['Area'])
})

