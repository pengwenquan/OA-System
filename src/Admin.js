
import React, { Component } from 'react'

import { withRouter }  from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;

class Admin extends Component {
  state = {
    collapsed: false,
    defaultSelectedKeys: [],
    openKeys: [],
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  onClick ({ item, key, selectedKeys }) {
    let { history } = this.props
    history.replace(key)
  }
  componentWillMount () {
    this.setState({defaultSelectedKeys:[this.props.location.pathname]})
  }
  render () {
    return (
      <div className="app-admin">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" >
            <img src="/image/admin/GDOU.jpg" />
          </div>
          <Menu theme="dark"  onClick={this.onClick.bind(this)} defaultSelectedKeys={this.state.defaultSelectedKeys}  mode="inline">
            <Menu.Item key="/">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="/news">
              <Icon type="desktop" />
              <span>News</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="/userIformation">userIformation</Menu.Item>
              <Menu.Item key="/attend">attend</Menu.Item>
              <Menu.Item key="/scole">scole</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <h1>广东海洋大学学生信息管理系统</h1>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              { this.props.children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
    )
  }
}

export default withRouter(Admin)