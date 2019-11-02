const cloud = require('wx-server-sdk')

const { addCourse } = require('./addCourse.js')
const { getStudentCourses } = require('./getStudentCourses.js')
const { getAllCourses } = require('./getAllCourses.js')

cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const {func, data} = event
  let res
  if (func === 'addCourse') {
    res = await addCourse(db, data).catch(err => console.log(err))
  }  else if (func === 'getAllCourses') {
    res = await getAllCourses(db, data).catch(err => console.log(err))
  } else if (func === 'getStudentCourses'){
    res = await getStudentCourses(db, data).catch(err => console.log(err))
  }

  return {
    context,
    data: res
  }
}