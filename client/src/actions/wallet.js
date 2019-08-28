import Taro from '@tarojs/taro'
import { createAction } from 'redux-actions'
import { getOpenId } from '../utils/index'
import { isEmptyObject } from '../utils/util'

export function addMoney (balance) {
  return async (dispatch, getState) => {
    if (process.env.TARO_ENV === 'weapp') {
      const _openid = await getOpenId()
      console.log(balance+_openid)
      await Taro.cloud.callFunction({
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
      })
    }
  }
}

export function useMoney (balance) {
    return async (dispatch, getState) => {
      if (process.env.TARO_ENV === 'weapp') {
        const _openid = await getOpenId()
        await Taro.cloud.callFunction({
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
        })
      }
    }
  }