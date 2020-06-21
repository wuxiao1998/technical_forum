import React from 'react';
import { List, Avatar, Space, Button, Pagination, Typography, Input, message } from 'antd';
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
        console.log('count',this.props.count)
        this.props.parent(this,this.props.count - 1);
        this.loadingData()
      })

    }

    deleteInfo = (infoId) =>{
      Axios.get('/information/deleteInformation?infoId='+infoId).then(res=>{
        message.success("删除成功")
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
               item.kind == '帖子消息'&&<Button onClick={this.gotoPost.bind(this,item.forumPostId)}>查看详情</Button>,
               item.status == '已读'&&<Button onClick={this.deleteInfo.bind(this,item.id)}>删除</Button>
              ]}
            >
              <List.Item.Meta
                title={<span>{item.content}</span>}
            description={<span>接收人:{item.user.username}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;创建时间:{item.createtime}</span>}
              />
    
            </List.Item>
          )}
        />
      }


}
export default MyInfo