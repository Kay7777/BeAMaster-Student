const cloud = require('wx-server-sdk')
const { addMoney } = require('./addMoney.js')
const { useMoney } = require('./useMoney.js')

cloud.init()

exports.main = async (event, context) => {
    const db = cloud.database()
    const { func, data } = event
    let res
    if (func === 'addMoney') {
      res = await addMoney(db, data).catch(err => console.log(err))
    } else if (func === 'useMoney') {
      res = await useMoney(db, data).catch(err => console.log(err))
    }
    
    return {
      context,
      data: res
    }
}