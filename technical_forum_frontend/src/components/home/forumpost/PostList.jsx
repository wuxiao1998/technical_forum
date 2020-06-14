import React from 'react';
import { List, Avatar, Space, Button, Pagination, Typography,Input  } from 'antd';
import { Link } from 'react-router-dom'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Axios from 'axios';
import '../../../css/App.css'
//帖子查询组件
const { Search } = Input;
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
      pageSize: 6,
      totalPage: 0,
      searchCondition:''
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


  loadingData =  (platekey) => {
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
    Axios.get('/forumPost/findByPlateId?plateId=' + platekey + '&pageNo=' + pageNo + '&pageSize=' + 
    this.state.pageSize+'&searchCondition='+this.state.searchCondition
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
    +'&searchCondition='+this.state.searchCondition
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

  searchCondition = value => {
    Axios.get('/forumPost/findByPlateId?plateId=' + this.state.platekey + '&pageNo=1&pageSize=' + 
    this.state.pageSize+'&searchCondition='+value
    ).then(res => {
      console.log(res.data)
      this.setState({
        listData: res.data.content,
        totalPage: res.data.totalElements,
        searchCondition:value,
        pageNo:1
      })
    })
    
  }
  render() {

    return <List
      header={
        <div>
          <h2 style={{ display: "inline" }}>帖子信息</h2>
          <Search
      placeholder="查找标题"
      enterButton="Search"
      onSearch={
        this.searchCondition
      }
      style={{ width: 200,marginLeft:'30px'}}
    />
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

export default PostList