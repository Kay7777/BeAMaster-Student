import Taro from '@tarojs/taro'
import { createAction } from 'redux-actions'
import {
  REQUEST_ALL_COURSES,
  RECEIVE_ALL_COURSES,
  REQUEST_STUDENT_COURSES,
  RECEIEV_STUDENT_COURSES,
  REQUEST_ADD_COURSE,
  RECEIVE_ADD_COURSE,
  REQUEST_DELETE_COURSE,
  RECEIVE_DELETE_COURSE
} from '../constants/course'