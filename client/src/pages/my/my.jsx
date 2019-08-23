import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtAvatar, AtButton } from 'taro-ui'
import '@tarojs/async-await'
import { connect } from '@tarojs/redux'

import { getWxUserData } from '../../utils/wx'

class My extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    userInfo: {}
  }

  async componentWillMount () {
    const { userInfo } = await getWxUserData()
    this.setState({
      userInfo: userInfo
    })
  }

  signupUniversity = () => {
    Taro.navigateTo({
      url: '/pages/signupUniversity/signupUniversity'
    })
  }  

  render() {
    const { userInfo } = this.state
    return (
      <View className='index'>
        <AtAvatar image={userInfo.avatarUrl} />
        <View>{userInfo.nickName}</View>
        { this.props.student.isLogged ?
          <View>
            <View>{this.props.student.university}</View> 
            <View>{this.props.student.email}</View>
          </View> 
          : <AtButton type='primary' size='normal' onClick={this.signupUniversity}>sign up</AtButton>
        }
      </View>
    )
  }
}

export default connect(({student}) => ({student}))(My)