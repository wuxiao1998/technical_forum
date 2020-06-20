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
            listData:[
                {
                    id:1,
                    content:'131313',
                },
                {
                    id:2,
                    content:'1313131312424',
                }
            ]
        }
      }

    componentWillMount()
    {
        // Axios.get('/forum/').then(res=>{
          
        // })


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
               <Button>已读</Button>,
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