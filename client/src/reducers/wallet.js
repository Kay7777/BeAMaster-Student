import { handleActions } from 'redux-actions'
import {
    REQUEST_BALANCE_INFO,
    RECEIVE_BALANCE_INFO,
    REQUEST_ADD_MONEY,
    RECEIVE_ADD_MONEY,
    REQUEST_USE_MONEY,
    RECEIVE_USE_MONEY,
} from '../constants/wallet'

const walletData = {
    balance: 0,
    isFetching: false,
    isLogged: false,
}

export default handleActions({
    [REQUEST_BALANCE_INFO] (state) {
        return {
            ...state,
            isFetching: true

        }
    },
    [RECEIVE_BALANCE_INFO] (state, action) {
        console.log(action.payload)
        return {
            ...state,
            isFetching: false,
            balance: action.payload
        }
    },
    [REQUEST_ADD_MONEY](state) {
        return {
            ...state,
            isFetching: true

        }
    },
    [RECEIVE_ADD_MONEY] (state, action) {
        const { balance } = action.payload
        return {
            ...state,
            isFetching: false,
            balance: balance
        }
    },
    [REQUEST_USE_MONEY](state) {
        return {
            ...state,
            isFetching: true

        }
    },
    [RECEIVE_USE_MONEY] (state, action) {
        const { balance } = action.payload
        return {
            ...state,
            isFetching: false,
            balance: balance
        }
    },
}, {...walletData})