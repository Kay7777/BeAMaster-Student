import Taro from '@tarojs/taro'
import { createAction } from 'redux-actions'
import { getOpenId } from '../utils/index'
import { isEmptyObject } from '../utils/util'
import {
  REQUEST_BALANCE_INFO,
  RECEIVE_BALANCE_INFO,
  REQUEST_ADD_MONEY,
  RECEIVE_ADD_MONEY,
  REQUEST_USE_MONEY,
  RECEIVE_USE_MONEY,
} from '../constants/wallet'

const aMap = {
  REQUEST_BALANCE_INFO: createAction(REQUEST_BALANCE_INFO, datas => datas),
  RECEIVE_BALANCE_INFO: createAction(RECEIVE_BALANCE_INFO, datas => datas),
  REQUEST_ADD_MONEY: createAction(REQUEST_ADD_MONEY, datas => datas),
  RECEIVE_ADD_MONEY: createAction(RECEIVE_ADD_MONEY, datas => datas),
  REQUEST_USE_MONEY: createAction(REQUEST_USE_MONEY, datas => datas),
  RECEIVE_USE_MONEY: createAction(RECEIVE_USE_MONEY, datas => datas)
}

export function showMoney () {
  return async (dispatch, getState) => {
    Taro.showLoading({title: '查询中...'})
    dispatch(aMap[REQUEST_BALANCE_INFO]())
    let res;
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'wallet',
        data: {
          func: 'showMoney',
          data: {
            _openid: _openid
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_BALANCE_INFO](getState().wallet))
      })
    }
    Taro.hideLoading()
    const walletDate = res.result.data
    console.log(walletDate)
    dispatch(aMap[RECEIVE_BALANCE_INFO](walletDate))
  }
}

export function addMoney (balance) {
  return async (dispatch, getState) => {
    Taro.showLoading({title: '充值中...'})
    dispatch(aMap[REQUEST_ADD_MONEY]())
    let res;
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      res = await Taro.cloud.callFunction({
        name: 'wallet',
        data: {
          func: 'addMoney',
          data: {
            _openid: _openid,
            balance: balance
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch(aMap[RECEIVE_ADD_MONEY](getState().wallet))
      })
    }
    Taro.hideLoading()
    const walletDate = res.result.data
    dispatch(aMap[RECEIVE_ADD_MONEY](walletDate))
  }
}

export function useMoney (balance) {
    return async (dispatch, getState) => {
      Taro.showLoading({title: '消费中...'})
      dispatch(aMap[REQUEST_USE_MONEY]())
      let res
      if (process.env.TARO_ENV === 'weapp') {
        const _openid = await getOpenId()
        res = await Taro.cloud.callFunction({
          name: 'wallet',
          data: {
            func: 'useMoney',
            data: {
              _openid: _openid,
              balance: balance
            }
          }
        }).catch(err => {
          console.log(err)
          dispatch(aMap[RECEIVE_USE_MONEY](getState().wallet))
        })
      }
      Taro.hideLoading()
      const walletDate = res.result.data
      dispatch(aMap[RECEIVE_USE_MONEY](walletDate))
    }
}

