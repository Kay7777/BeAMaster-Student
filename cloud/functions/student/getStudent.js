async function getStudent(db, data) {
  const { _openid } = data
  const studentDB = db.collection('Student')
  let studentData = {}

  const res = await studentDB.where({_openid: _openid}).get();
  if (res.data.length !== 0) {
    studentData = res.data[0]
  }
  return studentData
}

exports.getStudent = getStudent