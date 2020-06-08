import React from 'react';
import { List, Avatar, Space,Button,Pagination,Typography } from 'antd';
import {Link} from 'react-router-dom'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Axios from 'axios';
const { Text } = Typography;
const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
class PostList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
           loginin:true,
           platekey:'',
           listData:[]
        }
    }
    
    componentWillMount(){
    
      this.loadingData(sessionStorage.getItem("platekey"))
    }
    
 
    componentWillReceiveProps(nextProps){
     
      this.loadingData(nextProps.platekey)
      this.setState({
        platekey:nextProps.platekey
      })

  }
    

  loadingData = (platekey)=>{
    if(!platekey){
      platekey = 1;
    }

    Axios.get('/forumPost/findByPlateId?id='+platekey
      ).then(res=>{
        console.log(res.data)
      this.setState({
        listData:res.data
      })
    })



  }
    goLogin=()=>{
        this.props.history.push('/');
    }

    render(){ 
    
        return <List
        header={
          <div>
            <h2 style={{display:"inline"}}>帖子信息</h2>
            <Button style={{float:"right"}}><Link to={"/forumpost/add/"+this.state.platekey}>去发帖</Link></Button>
          </div>
        }
        footer={<div style={{textAlign:"center"}}><Pagination defaultCurrent={6} total={500} /></div>}
        bordered
        dataSource={this.state.listData}
        renderItem={item => (
            <List.Item
            key={item.title}
            style={{marginTop:"10px"}}
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