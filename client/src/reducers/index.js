import { combineReducers } from 'redux'
import student from './student'
import course from './course'

export default combineReducers({
    student,
    course
})