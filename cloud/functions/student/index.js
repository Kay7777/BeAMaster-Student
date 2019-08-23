// 云函数入口文件
const cloud = require('wx-server-sdk')

const { addStudent } = require('./addStudent.js')
const { getStudent } = require('./getStudent.js')

cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const { func, data } = event
  let res
  if (func === 'addStudent') {
    res = await addStudent(db, data).catch(err => console.log(err))
  } else if (func === 'getStudent') {
    res = await getStudent(db, data).catch(err => console.log(err))
  }
  
  return {
    context,
    data: res
  }
}