async function addStudent(db, data) {
  const { _openid, email, university } = data
  const studentDB = db.collection('Student')
  const studentWallet = db.collection('StudentWallet')
  console.log(data)
  await studentDB.add({
    data: {
      _openid: _openid,
      email: email,
      university: university
    }
  })
  await studentWallet.add({
    data: {
      _openid: _openid,
      balance: 0
    }
  })
  return data
}

exports.addStudent = addStudent