import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import '@tarojs/async-await'
import configStore from './store'

import { setGlobalData } from './constants/globalData'
import { getWxUserData } from './utils/wx'

import Launch from './pages/launch/launch'

import './app.scss'

const store = configStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/launch/launch',      
      'pages/index/index',      
      'pages/my/my',
      'pages/signupUniversity/signupUniversity',
      'pages/signupEmail/signupEmail',
      'pages/list/list',      
      'pages/my/wallet/wallet',
      'pages/my/rate/rate',
      'pages/my/profile/profile'

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'student',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#a9b7b7',
      selectedColor: '#11cd6e',
      backgroundColor: 'white',      
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'assets/shouye.png',
          selectedIconPath: 'assets/shouye_selected.png'
        },
        {
          pagePath: 'pages/my/my',
          text: '我的',
          iconPath: 'assets/yonghu.png',
          selectedIconPath: 'assets/yonghu_selected.png'
        }
      ]
    },
    cloud: true
  }

  constructor () {
    super(...arguments)
  }

  async componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'ts-dev-zehzs', // 前往云控制台获取环境id
        traceUser: true      // 是否要捕捉每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
      })
      const userData = await getWxUserData()
      setGlobalData('userData', userData)
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Launch />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
