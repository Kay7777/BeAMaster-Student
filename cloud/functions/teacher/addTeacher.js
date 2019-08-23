async function addTeacher(db, data) {
  const { _openid, email, university } = data
  const teacherDB = db.collection('Teacher')
  console.log(data)
  await teacherDB.add({
    data: {
      _openid: _openid,
      email: email,
      university: university
    }
  })
  return data
}

exports.addTeacher = addTeacher