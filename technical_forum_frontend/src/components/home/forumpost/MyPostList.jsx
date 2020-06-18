import React from 'react';
import { List, Avatar, Space, Button, Pagination, Typography,Input  } from 'antd';
import { Link } from 'react-router-dom'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Axios from 'axios';
import '../../../css/App.css'
//基于帖子查询组件的修改版
const { Search } = Input;
const { Text } = Typography;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
class MyPostList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loginin: true,
      platekey: '',
      listData: [],
      pageNo: 1,
      pageSize: 6,
      totalPage: 0,
      searchCondition:'',
      userid: JSON.parse(sessionStorage.getItem("user")).id,
    }
  }

  componentWillMount() {

    this.loadingData()
  }





  loadingData =  (platekey) => {

    console.log(sessionStorage,'111111111112222222222222222')
    Axios.get('/forumPost/findByUserId?userId=' + this.state.userid + '&pageNo=' + this.state.pageNo + '&pageSize=' + 
    this.state.pageSize
    ).then(res => {
        console.log(res,'123456789111111111111111111111111111111')
      console.log(res.data)
      this.setState({
        listData: res.data.content,
        totalPage: res.data.totalElements,
      })
    })

  }
  pageChange = (page) => {
    Axios.get('/forumPost/findByUserId?userId=' + this.state.userid + '&pageNo=' + page + '&pageSize=' + 
    this.state.pageSize
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
           
          ]}
        >
          <List.Item.Meta
            title={<Link to={'/forumpost/detail/'+item.id} style={{fontSize:'16px',fontWeight:700}}>{item.title}</Link>}
            description={<div><span style={{display:'inline-block',marginTop:'10px'}} className="product-buyer-name">
              {item.description}</span>
              <div style={{marginTop:'10px'}}>
                <Avatar style={{marginRight:'10px'}} 
              src={"http://localhost:8000/forum/image/"+item.user.id+".jpg"} />
            <Text type="secondary" className="product-buyer-name">
              作者:{item.user.username}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;发帖时间:{item.createtime}
            </Text>
            </div>
            </div>
          }
          />

        </List.Item>
      )}
    />
  }
}

export default MyPostList