
import React, { Component } from 'react'
import './index.scss'
import Swiper from 'swiper'
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      banner: []
    }
  }
  
  getBanner () {
    this.$http.ajax({
      url: '/api/GDOU.json'
    }).then(res => {
      console.log(res)
      this.setState({banner: res})
      if (!this.swiper) {
        this.swiper = new Swiper(this.el, {
          pagination: { el: '.swiper-pagination' }
        })
      } 
    })
  }
  componentDidMount () {
    this.getBanner()
    
  }
  renderSlideItem () {
    let { banner } = this.state
    return  banner.map(item =>(
      <div className="swiper-slide" key={item.id}>
        <img src={item.imgurl} alt=" " />
      </div>
    ))  
  }
  
  render () {
    return (
      <div className = "app-home">
        <h3>广东海洋大学首页</h3>
        <div className="app-home-left float-lt">
          <ul>
            <li>学校概况</li>
            <li>师资介绍</li>
            <li>党建</li>
            <li>后勤</li>
          </ul>
        </div>
        <div className="app-home-right">
          <div className="home-r-top">
            <div ref={el =>this.el = el} className="swiper-container">
              <div className="swiper-wrapper">
                  { this.renderSlideItem() }
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="home-r-buttom"></div>
        </div>
      </div>
    )
  }

}

export default Home