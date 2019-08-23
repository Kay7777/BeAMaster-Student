import { handleActions } from 'redux-actions'
import {
  REQUEST_STUDENT_INFO,
  RECEIVE_STUDENT_INFO,
  RECEIVE_NO_STUDENT_INFO,
  REQUEST_ADD_STUDENT,
  RECEIVE_ADD_STUDENT
} from '../constants/student'

const studentData = {
  isFetching: false,
  isLogged: false,
  isUploading: false
}

export default handleActions({
  [REQUEST_STUDENT_INFO] (state) {
    return {
      ...state,
      isFetching: true
    }
  },
  [RECEIVE_STUDENT_INFO] (state, action) {
    const { email, university } = action.payload
    return {
      ...state,
      email,
      university,
      isFetching: false,
      isLogged: true
    }
  },
  [RECEIVE_NO_STUDENT_INFO] (state) {
    return {
      ...state,
      isFetching: false
    }
  },
  // [REQUEST_ADD_STUDENT] (state) {
  //   return {
  //     ...state,
  //     isUploading: true
  //   }
  // },
  // [RECEIVE_ADD_STUDENT] (state, action) {
  //   const { email, university } = action.payload
  //   return {
  //     ...state,
  //     email,
  //     university,
  //     isLogged: true,      
  //     isUploading: false
  //   }
  // }
}, {...studentData})