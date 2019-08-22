import Taro from '@tarojs/taro'
import { createAction } from 'redux-actions'

import {
  REQUEST_STUDENT_INFO,
  RECEIVE_STUDENT_INFO,
  RECEIVE_NO_STUDENT_INFO,
  REQUEST_ADD_STUDENT,
  RECEIVE_ADD_STUDENT
} from '../constants/student'

import { getOpenId } from '../utils/index'
import { isEmptyObject } from '../utils/util'

const aMap = {
  REQUEST_STUDENT_INFO: createAction(REQUEST_STUDENT_INFO, datas => datas),
  RECEIVE_STUDENT_INFO: createAction(RECEIVE_STUDENT_INFO, datas => datas),
  RECEIVE_NO_STUDENT_INFO: createAction(RECEIVE_NO_STUDENT_INFO, datas => datas),
  REQUEST_ADD_STUDENT: createAction(REQUEST_ADD_STUDENT, datas => datas),  
  RECEIVE_ADD_STUDENT: createAction(RECEIVE_ADD_STUDENT, datas => datas)
}

export function fetchStudentData () {
  return async (dispatch, getState) => {
    Taro.showLoading({ title: '加载中...' })
    dispatch(aMap[REQUEST_STUDENT_INFO]())
    let res
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'student',
        data: {
          func: 'getStudent',
          data: {
            _openid: _openid
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_STUDENT_INFO](getState().student))
      })
    }
    Taro.hideLoading()
    const studentData = res.result.data
    if (isEmptyObject(studentData)) {
      dispatch(aMap[RECEIVE_NO_STUDENT_INFO]())
    } else {
      dispatch(aMap[RECEIVE_STUDENT_INFO](studentData))
    }
  }
}

export function addStudentData (email, university) {
  return async (dispatch, getState) => {
    Taro.showLoading({ title: '加载中...' })
    dispatch(aMap[REQUEST_ADD_STUDENT]())
    let res
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'student',
        data: {
          func: 'addStudent',
          data: {
            _openid: _openid,
            email: email,
            university: university
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_ADD_STUDENT](getState().student))
      })
    }
    Taro.hideLoading()
    const studentData = res.result.data
    dispatch(aMap[RECEIVE_ADD_STUDENT](studentData))
  }
}