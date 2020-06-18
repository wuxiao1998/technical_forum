import React from 'react';
import Axios from 'axios';
import { Table, Tag, Space, Button,Typography } from 'antd';
const { Paragraph } = Typography;
const columns = [

    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: text => <Paragraph ellipsis>{text}</Paragraph>,
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
class NoticeManagement extends React.Component {

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
                    title:item.title,
                    content:item.content,
                    plateId:item.plate?item.plate.name:'全部',
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

export default NoticeManagement