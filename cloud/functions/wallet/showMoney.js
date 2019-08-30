async function showMoney(db, data) {
    const { _openid, balance  } = data
    const res = await db.collection('StudentWallet').where({_openid: _openid}).get()
    return res.data[0].balance
  }
  
  exports.showMoney = showMoney