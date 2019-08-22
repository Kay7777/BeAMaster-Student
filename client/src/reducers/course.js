import { handleActions } from 'redux-actions'
import {

} from '../constants/course'

import { arrayToObject } from '../utils/util'

const courseData = {
  isUploading: false,
  isFetching: false,
  teacherCourses: {}
}

export default handleActions({
  [REQUEST_ADD_COURSE] (state) {
    return {
      ...state,
      isUploading: true
    }
  },
  [RECEIVE_ADD_COURSE] (state) {
    return {
      ...state,
      isUploading: false,
    }
  },
  [REQUEST_TEACHER_COURSES_INFO] (state) {
    return {
      ...state,
      isFetching: true,
    }
  },
  [RECEIVE_TEACHER_COURSES_INFO] (state, action) {
    const teacherCourses = arrayToObject(action.payload, '_id')
    return {
      ...state,
      isFetching: false,
      teacherCourses: teacherCourses
    }
  }
}, {...courseData})