async function useMoney(db, data) {
    const { _openid, balance  } = data
    await db.collection('StudentWallet').doc(_openid).update({
        data: {
          balance: balance
        },
        success: function(res) {
          console.log(res.data)
        }
      })
    return data
  }
  
  exports.useMoney = useMoney