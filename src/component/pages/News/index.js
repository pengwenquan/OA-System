
import React, { Component } from 'react'
import connect from '../../../modules/connect'
import { Table, Button, Divider, Modal } from 'antd';
import './index.scss'


class News extends Component {
  constructor (props) {
    super(props)
    // this.showModal = this.showModal.bind(this)
  }
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    columns: [{
      title: '类型',
      dataIndex: 'type',
    }, {
      title: '主题',
      dataIndex: 'title',
    }, {
      title: '操作',
      dataIndex: 'action',
      render:(text, record) => (
        <div>
          <Button type="primary" onClick={this.showModal.bind(this,record.key)}>查看</Button>
          <Divider type="vertical" />
          <Button onClick={this.createNews.bind(this)} >增加</Button>
          <Divider type="vertical" />
          <Button type="danger" onClick={this.deleteNews.bind(this)} >删除</Button>
        </div>
      ),
    }],
    data: [],
    visible: false,
    details:[],
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  componentWillMount () {
    this.$http.ajax({
      url: '/api/news.json'
    }).then(res => {
      console.log(res)
      let arr = []
      for (let i = 0; i < res.length; i++) {
        arr.push({
          key:res[i].id,
          type: res[i].type,
          title: res[i].title,
          content:res[i].content
          
        }) 
      } 
      this.setState({data: arr})
    })
  }
  showModal = (id) => {
    id -= 1
    this.setState({
      visible: true,
      details: [this.state.data[id].title,this.state.data[id].content]
    });
    console.log(id,this.state.data)
  }
  renderModalContent () {
    console.log(this.state.details)
    return (
      <p>{this.state.details[1]}</p>
    )
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  createNews () {
    let { commons } = this.props
    if ( commons.user_state.permission.indexOf("create_board") != -1 ) {
      alert('你好！')
    }
  }
  deleteNews () {
    let { commons } = this.props
    if ( commons.user_state.permission.indexOf("control_board") != -1 ) {
      alert('你没有该操作权限！！！')
    }
  }
  render () {
    let { columns, data } = this.state
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      
      <div className = "app-news">
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
          <div>
          <Modal
            title={this.state.details[0]}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            { this.renderModalContent() }
          </Modal>
        </div>
      </div>
    )
  }

}

export default connect(News, 'commons')