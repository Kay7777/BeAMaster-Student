const cloud = require('wx-server-sdk')

const { getList } = require('./getList.js')

cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const { func, data } = event
  let res
  if (func === 'getList') {
    res = await getList(db, data).catch(err => console.log(err))
  }
  
  return {
    context,
    data: res
  }
}