import Taro, { Component } from "@tarojs/taro"
import { View, Image } from '@tarojs/components'
import { AtAvatar, AtGrid, AtButton, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addMoney, showMoney } from '../../../actions/wallet'

class Wallet extends Component {
    config = {
        navigationBarTitleText:"钱包"
    }

    state = {
        balance: 0,
    }

    showMoney = async () => {
        console.log('正在进行钱包获取')
        await this.props.showMoney()
        console.log(this.props.wallet.walletData.balance)
        this.setState({
          balance: this.props.wallet.walletData.balance
        })
      } 

    addMoney = async () => {
        await this.setState({balance: this.state.balance + 5})
        console.log('I have add the 5 bucks')
        this.props.addMoney(this.state.balance + 5)
    }


    render () {
        return (
            <View>
                <View className="at-row first-half">
                    <View className="at-col at-col-8 balance">
                        余额：{this.state.balance}
                    </View>
                    <View className="at-col at-col-2">
                        <AtIcon value='add-circle' size='40' color='black' onClick={this.addMoney}></AtIcon>
                    </View>
                    <View className="at-col at-col-2">
                        <AtIcon value='reload' size='40' color='black' onClick={this.showMoney}></AtIcon>
                    </View>
                </View>
                <View className="second-half">
                    <AtGrid data={
                        [
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                            value: '充值中心',
                        },
                        {
                            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                            value: '折扣券'
                        },
                        {
                            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                            value: '领会员'
                        },
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                            value: '新品首发'
                        },
                        {
                            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                            value: '领积分'
                        },
                        {
                            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                            value: '手机支付'
                        }
                        ]
                    } />
                </View>
                
            </View>
            
                
            
        )
    }
}

export default connect(({wallet}) => ({wallet}), (dispatch) => ({
  async addMoney (...args) {
    await dispatch(addMoney(...args))
  },
  async showMoney (...args) {
    await dispatch(showMoney(...args))
  }
})
)(Wallet)