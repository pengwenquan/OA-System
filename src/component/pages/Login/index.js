import React, { Component } from 'react'
import connect from '../../../modules/connect'
import './index.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    let username  = this.username.value
		let password = this.password.value
    // if (username === 'pwquan' && password === '123456' ) {
		
    // }
    this.props.commons_actions.login({
			username, password,
			success:() => {
					this.props.history.replace('/')
			}
	})
  }
  render () {
    return (
      <div className = "app-login">
        <h1>后台登录系统</h1>
    <div className="container w3">
        <h2>现在登录</h2>
		<form onSubmit = {this.handleSubmit}>
			<div className="username">
				<span className="username" >用户:</span>
				<input type="text" name="name" ref={el =>this.username = el } className="name" placeholder="" required/>
				<div className="clear"></div>
			</div>
			<div className="password-agileits">
				<span className="username">密码:</span>
				<input type="password" name="password" ref={el =>this.password = el } className="password" placeholder="" required/>
				<div className="clear"></div>
			</div>
			<div className="rem-for-agile">
				<input type="checkbox"  name="remember" className="remember"/>记得我　
        <br/>
				<a href="#">忘记了密码</a><br/>
			</div>
			<div className="login-w3">
					<input type="submit"  className="login" value="Login"/>
			</div>
			<div className="clear"></div>
		</form>
	</div>
	<div className="footer-w3l">
		<p> 某某公司后台登录系统</p>
	</div>
      </div>
    )
  }

}

export default connect(Login,'commons')