import Taro, { Component } from "@tarojs/taro"
import { connect } from '@tarojs/redux'
import { View, Button } from "@tarojs/components"
import { getWxUserData } from '../../utils/wx'
import { AtAvatar, AtCard, AtIcon, AtButton } from 'taro-ui'
import '@tarojs/async-await'
import './my.scss'

class My extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  state = {
    userInfo: {}
  }

  toRate =()=> {
    Taro.navigateTo({
      url: '/pages/my/rate/rate'
    })
  }

  toProfile =()=> {
    Taro.navigateTo({
      url: '/pages/my/profile/profile'
    })
  }

  toWallet =()=> {
    Taro.navigateTo({
      url: '/pages/my/wallet/wallet'
    })
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
        { this.props.student.isLogged ?
        <View>
          <View className='user-page' style={{backgroundImage: `url(http://makefriends.bs2dl.yy.com/my_page_top_bg.png)`}}>
            <View className='at-row'>
              <View className='at-col at-col-8'>
                {/* <View className="infor1">{this.props.student.name}</View> */}
                <View className="infor2">{this.props.student.email}</View>
                <View className="infor2">{this.props.student.university}</View>
              </View>
              <View className='at-col at-col-3 photo'>
                <AtAvatar className="avatar" circle="true" size="large" image={userInfo.avatarUrl} />
              </View>
              <View className="at-col at-col-1 icon" >
                <AtIcon onClick={this.toProfile} value='chevron-right' size='30' color='grey'></AtIcon>
              </View>
            </View>
          </View>
          <View className="buttons">
            <Button onClick={this.toWallet}>钱包</Button>
            <Button onClick={this.toRate}>评分</Button>
            <Button onClick={this.toProfile}>设置</Button>
          </View>
          </View>
          : <AtButton type='primary' size='normal' onClick={this.signupUniversity}>sign up</AtButton>
        }
      </View>
    )
  }
}

export default connect(({student}) => ({student}))(My)