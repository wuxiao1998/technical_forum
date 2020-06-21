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
               <Button>查看详情</Button>
              ]}
            >
              <List.Item.Meta
                title={<Link to={'/forumpost/detail/'+item.id} style={{fontSize:'16px',fontWeight:700}}>{item.content}</Link>}
              />
    
            </List.Item>
          )}
        />
      }


}
export default MyInfo