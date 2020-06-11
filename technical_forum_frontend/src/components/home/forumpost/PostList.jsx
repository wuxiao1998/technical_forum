import React from 'react';
import { List, Avatar, Space, Button, Pagination, Typography } from 'antd';
import { Link } from 'react-router-dom'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Axios from 'axios';
//帖子查询组件
const { Text } = Typography;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
class PostList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loginin: true,
      platekey: '',
      listData: [],
      pageNo: 1,
      pageSize: 8,
      totalPage: 0,
    }
  }

  componentWillMount() {

    this.loadingData(sessionStorage.getItem("platekey"))
  }


  componentWillReceiveProps(nextProps) {
    //当父组件传入的platekey改变时,触发此生命周期函数
    this.loadingData(nextProps.platekey)
    this.setState({
      platekey: nextProps.platekey,
      pageNo: 1
    })

  }


  loadingData = (platekey) => {
    if (!platekey) {
      platekey = 1;
    }
    let pageNo;
    //解决切换板块,页码不刷新
    if (platekey != this.props.platekey) {
      pageNo = 1;
    } else {
      pageNo = this.state.pageNo;
    }
    Axios.get('/forumPost/findByPlateId?plateId=' + platekey + '&pageNo=' + pageNo + '&pageSize=' + this.state.pageSize
    ).then(res => {
      console.log(res.data)
      this.setState({
        listData: res.data.content,
        totalPage: res.data.totalElements,
      })
    })

  }
  pageChange = (page) => {
    Axios.get('/forumPost/findByPlateId?plateId=' + this.state.platekey + '&pageNo=' + page + '&pageSize=' + this.state.pageSize
    ).then(res => {
      console.log(res.data)
      this.setState({
        listData: res.data.content,
        totalPage: res.data.totalElements,
        pageNo: page
      })
    })

  }
  goLogin = () => {
    this.props.history.push('/');
  }

  render() {

    return <List
      header={
        <div>
          <h2 style={{ display: "inline" }}>帖子信息</h2>
          <Button style={{ float: "right" }}><Link to={"/forumpost/add/" + this.state.platekey}>去发帖</Link></Button>
        </div>
      }
      footer={<div style={{ textAlign: "center" }}><Pagination
        current={this.state.pageNo} pageSize={this.state.pageSize} total={this.state.totalPage}
        showSizeChanger={false} onChange={this.pageChange} /></div>}
      bordered
      dataSource={this.state.listData}
      renderItem={item => (
        <List.Item
          key={item.title}
          style={{ marginTop: "10px" }}
          actions={[
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
          />
          <Text type="secondary">作者:{item.user.username}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;发帖时间:{item.createtime}
          </Text>
        </List.Item>
      )}
    />
  }
}

export default PostList