async function addStudent(db, data) {
  const { _openid, email, university } = data
  const studentDB = db.collection('Student')
  console.log(data)
  await studentDB.add({
    data: {
      _openid: _openid,
      email: email,
      university: university
    }
  })
  return data
}

exports.addStudent = addStudent