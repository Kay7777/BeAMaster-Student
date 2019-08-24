async function getList (db, data) {
  const courseDB = db.collection('Course')
  const _ = db.command

  // only get posted courses
  const allCourses = await courseDB.get()
  let res = {}
  let searchCourses = allCourses.data.filter(item => {
    return item.courseName.indexOf(data.keyWords) > -1 
  })
  res.courses = searchCourses
  res.count = searchCourses.length
  res.page = data.page
  return res
}

exports.getList = getList