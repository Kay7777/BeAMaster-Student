async function addMoney(db, data) {
    const { _openid, balance  } = data
    const res = await db.collection('StudentWallet').where({_openid: _openid}).get()
    const id = res.data[0]._id
    await db.collection('StudentWallet').doc(id).update({
        data: {
          balance: balance
        },
        success: console.log,
        fail: console.error
      })
    return data
  }
  
  exports.addMoney = addMoney