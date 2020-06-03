import React from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Axios from 'axios';


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
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={this.state.listData}
        renderItem={item => (
            <List.Item
            key={item.title}
            actions={[
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
            />
                {console.log(this.state.listData)}
            {item.title}
          </List.Item>
        )}
      />
        }
}

 export default PostList