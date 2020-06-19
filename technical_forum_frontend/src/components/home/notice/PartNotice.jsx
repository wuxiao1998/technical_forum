import React from 'react';
import Axios from 'axios';
import { Table, Popconfirm, Space, Button, Typography, Modal, Form, Input, message,Row, Col } from 'antd';
const { Paragraph } = Typography;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 15 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

//显示公告组件
class PartNotice extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
      titilename:'',
      plateid: sessionStorage.getItem("plateKey") ? sessionStorage.getItem("plateKey") : 1,
      plateList: [],
      columns: [

        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          render: text => <Paragraph style={{ width: '200px' }} ellipsis>{text}</Paragraph>,
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
              <Button onClick={this.showDetail.bind(this,record)}>查看详情</Button>
            </Space>
          ),
        },
      ],//构造表格列属性
      pagination: {
        current: 1,
        pageSize: 5
      }//表格分页属性
    }
  }

  //跳转详情页面
  showDetail = (record)=>{
   this.props.history.push({
     pathname:'/noticedetail',
     state:record
   })

  }


  //组件加载时查询数据
  componentWillMount() {
    Axios.get('/plate/findAll').then(res => {
      this.setState({
        plateList: res.data
      })
    })
    this.loadingData(this.state.pagination.current)

  }



  //查询接口
  loadingData = (pageNo) => {
    let datasource = [];
    Axios.get('/notice/searchByUser?plateId='+ this.state.plateid + '&pageNo=' + pageNo + '&pageSize=' + this.state.pagination.pageSize).then(res => {
      console.log(res,'12121212121')
      let data = res.data.content
      this.setState({
        titilename:data?data[0].plate.name:''
      })
      console.log('qdq',data)
      data.map(item => {
        let notice = {
          key: item.id.toString(),
          title: item.title,
          content: item.content,
          plateId: item.plate ? item.plate.name : '全部',
          createtime: item.createtime,
          username: item.createUser ? item.createUser.username : ''
        }
        datasource.push(notice)
      })
      this.setState({
        noticeList: datasource,
        pagination: {
          current: pageNo,
          pageSize: 5,
          total: res.data.totalElements
        }
      })
    })
  }

  handleTableChange = (pagination) => {
    this.loadingData(pagination.current)
  };
  render() {
    return <div style={{ minHeight: '80vh', marginTop: "1%", marginLeft: "3%", marginRight: "3%", marginBottom: "3%", }}>
        <Col span={12}><Button onClick={this.props.history.goBack} style={{float:"middle" }}>返回</Button>
        </Col>
      <h1 style={{ textAlign: "center"}}>{this.state.titilename}板块公告</h1><br/>
      <Table columns={this.state.columns}
        onChange={this.handleTableChange}
        dataSource={this.state.noticeList}
        pagination={this.state.pagination} 
        />
        <Row>
        <Col span={12}></Col>
        </Row>
    </div>
  }
}

export default PartNotice