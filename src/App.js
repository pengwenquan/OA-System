import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import connect from './modules/connect'

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {

    console.log(this.props)
    this.props.commons_actions.get_initial_user_state(() => {
      //当直接进入某个路由的时候判断是否登录
      this.checkLogin(this.props)
    })
  }
  checkLogin (props) {//登录判断函数
    let { commons, history } = this.props
    if ( props.location.pathname !== '/login') {
      if ( !commons.user_state ) {
        history.replace('/login')
      }
    }
  }
  render() {
    return (
      <div className="App">
        { this.props.children }
      </div>
    );
  }
}

export default  withRouter(connect(App,'commons'))
