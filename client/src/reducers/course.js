import { handleActions } from 'redux-actions'
import {

} from '../constants/course'

import { arrayToObject } from '../utils/util'

const courseData = {
  isUploading: false,
  isFetching: false,
  studentCourses: {},
  allCourses: {}
}

export default handleActions({
  [REQUEST_ALL_COURSES](state) {
    return {
      ...state,
      isFetching: true,
    }
  },
  [RECEIVE_ALL_COURSES] (state, action) {
    const { allCourses } = action.payload
    return {
      ...state,
      isFetching: false,
      allCourses: allCourses
    }
  },
  [REQUEST_STUDENT_COURSES] (state) {
    return {
      ...state,
      isFetching: true,
    }
  },
  [RECEIVE_STUDENT_COURSES] (state, action) {

  }
}, {...courseData})