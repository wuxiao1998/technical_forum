import React from 'react';
import Axios from 'axios';
import { Table, Tag, Space, Button } from 'antd';

const columns = [

    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: text => <a>{text}</a>,
    },
    {
      title: '板块',
      dataIndex: 'plateId',
      key: 'plateId',
    },
    {
      title: '发布时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: '发布人',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        
        <Space size="middle">
              {console.log(record)}
          <a>编辑 {record.name}</a>
          <Button onClick={test.bind(this,record)}>删除</Button>
        </Space>
      ),
    },
  ];
  function test(record){
    console.log(record)
  }

//显示公告组件
class Notice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            noticeList:[],
        }
    }

     componentWillMount(){
        let datasource = [];
         Axios.get('/notice/searchByAdmin?pageNo=1&pageSize=2').then(res=>{
            console.log(res)
          
            let data = res.data.content
            data.map(item=>{
                let notice = {
                    key:item.id.toString(),
                    content:item.content,
                    plateId:item.plateId,
                    createtime:item.createtime,
                    username:item.createUser.username
                }
                datasource.push(notice)
            })
            this.setState({
                noticeList:datasource
               })
        })
        console.log(datasource)
        
    }
    render(){
        return <div style={{ minHeight: '80vh', marginTop: "5%", marginLeft: "3%" , marginRight: "3%", marginBottom: "3%",}}>
                <Table columns={columns} dataSource={this.state.noticeList} />
            </div>
    }
}

export default Notice