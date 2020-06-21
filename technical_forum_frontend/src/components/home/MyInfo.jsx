import React from 'react';
import { List, Avatar, Space, Button, Pagination, Typography, Input } from 'antd';
import { Link } from 'react-router-dom'
import Axios from 'axios';
class MyInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1,
            pageSize: 6,
            totalPage: 0,
            listData:[]
        }
      }

    componentWillMount()
    {
        this.loadingData();


    }

    loadingData = ()=>{
      Axios.get('/information/searchInformation?pageNo='+this.state.pageNo+'&pageSize='+this.state.pageSize).then(res=>{
        console.log(res)
        this.setState({
          listData:res.data.content,
          totalPage: res.data.totalElements,
        })
      })
    }
    updateStatus = (infoId)=>{
      console.log(infoId)
      Axios.get('/information/changeInformationStatus?informationId='+infoId).then(res=>{
        this.loadingData()
      })

    }

     /* 当点击分页控件时，触发此函数*/
  pageChange = (page) => {
    Axios.get('/information/searchInformation?pageNo='+page+'&pageSize='+this.state.pageSize).then(res => {
      console.log(res.data)
      this.setState({
        listData: res.data.content,
        totalPage: res.data.totalElements,
        pageNo: page
      })
    })

  }

  gotoPost = (forumPostId)=>{

    this.props.history.push('/forumpost/detail/'+forumPostId)
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
              key={item.id}
              style={{ marginTop: "10px" }}
              actions={[
               item.status == '未读'&&<Button onClick={this.updateStatus.bind(this,item.id)}>已读</Button>,
               item.kind == '帖子消息'&&<Button onClick={this.gotoPost.bind(this,item.forumPostId)}>查看详情</Button>
              ]}
            >
              <List.Item.Meta
                title={<span>{item.content}</span>}
              />
    
            </List.Item>
          )}
        />
      }


}
export default MyInfo