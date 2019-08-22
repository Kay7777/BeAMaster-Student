import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './launch.scss'
import { fetchStudentData } from '../../actions/student';

class Launch extends Component {
    config = {
      navigationBarTitleText: 'Launch'
    }
  
    componentWillMount () { 
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.direct()
      }, 2000)
    }
  
    direct = async () => {
      await this.props.fetchStudentData()
      Taro.switchTab({
          url: '/pages/index/index'
      })
    }
  
    render () {
      return (
        <View>Launch</View>
      )
    }
  }
  
  export default connect(({student}) => ({student}), (dispatch) => ({
    async fetchStudentData () {
      await dispatch(fetchStudentData())
    }
  })
  )(Launch)