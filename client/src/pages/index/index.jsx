import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { View, Text } from '@tarojs/components'
import './index.scss'

import SearchInto from '../../components/search/searchInto'
import Modal from '../../components/modal/modal'
import { getUserInfo } from '../../utils/index'
import { isEmptyObject } from '../../utils/util'
import { setGlobalData } from '../../constants/globalData'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    animationClass: '',
    showAuthModal: false
  }

  hideAuthModal () {
    this.setState({
      showAuthModal: false
    })
    // Taro.setStorage({key: 'isHomeLongHideAuthModal', data: true})
  }

  processAuthResult (userData) {
    Taro.setStorage({key: 'isHomeLongHideAuthModal', data: true})
    console.log(userData)
    if (userData.userInfo) {
      setGlobalData('userData', userData)
    }
    this.setState({
      showAuthModal: false
    })
  }

  componentWillMount () { }

  componentDidMount () { 
    setTimeout(async () => {
      const userData = await getUserInfo()
      let isHomeLongHideAuthModal
      try {
        isHomeLongHideAuthModal = Taro.getStorageSync('isHomeLongHideAuthModal')
      } catch (error) {
        console.log(error)
      }
      if (isHomeLongHideAuthModal === true || isHomeLongHideAuthModal === false) {
        console.log("isHomeLongHideAuthModal != null")
        let showAuthModal
        if (isEmptyObject(userData) && !this.state.showAuthModal && !isHomeLongHideAuthModal) {
          showAuthModal = true
        } else {
          showAuthModal = false
        }
        console.log(`showAuthModal: ${showAuthModal}`)
        this.setState({
          animationClass: 'animation',
          showAuthModal
        })
      } else {
        console.log("isHomeLongHideAuthModal == null")        
        let showAuthModal
        if (isEmptyObject(userData) && !this.state.showAuthModal) {
          showAuthModal = true
        } else {
          showAuthModal = false
        }
        console.log(`showAuthModal: ${showAuthModal}`)
        this.setState({
          animationClass: 'animation',
          showAuthModal
        })
      }
    }, 1000)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { showAuthModal } = this.state
    return (
      <View>
        <View className='index-search_into'>
          <SearchInto placeholder='搜索框' type='index' />
        </View>
        {showAuthModal &&
        <Modal
          title='授权提示'
          contentText='人人为师请求获取授权信息'
          onCancelCallback={this.hideAuthModal.bind(this)}
          onConfirmCallback={this.processAuthResult.bind(this)}
          isAuth={true}
        />
        }
      </View>
    )
  }
}
