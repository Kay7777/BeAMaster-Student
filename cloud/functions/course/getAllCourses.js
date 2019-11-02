async function getAllCourses(db, data) {
    const courseDB = db.collection('Course')
    const res = await courseDB.get();
    return res.data
  }
  
  exports.getAllCourses = getAllCourses