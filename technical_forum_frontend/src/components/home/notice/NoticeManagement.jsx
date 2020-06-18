import React from 'react';
import Axios from 'axios';
import { Table, Tag, Space, Button, Typography, Modal, Form, Input, message } from 'antd';
const { Paragraph } = Typography;
const { TextArea } = Input;
const columns = [

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
        {console.log(record)}
        <Button>编辑 {record.name}</Button>
        <Button onClick={test.bind(this, record)}>删除</Button>
      </Space>
    ),
  },
];
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
function test(record) {
  console.log(record)
}

//显示公告组件
class NoticeManagement extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
      visible: false,
      plateList:[]
    }
  }

  //新增公告
  addNotice = () => {
    this.setState({
      visible: true
    })

  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };


  handleOk = () => {
    this.setState({
      visible: false
    });
  };
  componentWillMount() {
    Axios.get('/plate/findAll').then(res=>{
      this.setState({
        plateList:res.data
      })
    })
    this.loadingData()

  }


  onFinish = values => {
    console.log('Received values of form: ', values);
    Axios.post('/notice/create',{
      title:values.title,
      content:values.content,
      plate:{
        id:values.plate == '全部'?null:values.plate,
      }
    }).then(res=>{
      this.loadingData()
      message.success("添加成功")
      this.setState({
        visible:false
      })
      
    })
  }



  loadingData = () => {
    let datasource = [];
    Axios.get('/notice/searchByAdmin?pageNo=1&pageSize=5').then(res => {
      console.log(res)
      let data = res.data.content
      data.map(item => {
        let notice = {
          key: item.id.toString(),
          title: item.title,
          content: item.content,
          plateId: item.plate ? item.plate.name : '全部',
          createtime: item.createtime,
          username: item.createUser.username
        }
        datasource.push(notice)
      })
      this.setState({
        noticeList: datasource
      })
    })
  }
  render() {
    return <div style={{ minHeight: '80vh', marginTop: "5%", marginLeft: "3%", marginRight: "3%", marginBottom: "3%", }}>
      <Button onClick={this.addNotice} style={{ marginBottom: '20px' }}>新增公告</Button>
      <Table columns={columns} dataSource={this.state.noticeList} />
      <Modal
        title="新增公告"
        visible={this.state.visible}
        maskClosable={false}
        destroyOnClose={true}
        onOk={this.handleOk}
        footer={null}
        onCancel={this.handleCancel}
      >
        <Form
          {...formItemLayout}
          name="register"
          onFinish={this.onFinish}
          scrollToFirstError
          initialValues={{
          }}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
              {
                max:20,
                message:'标题过长'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="plate"
            label="所属板块"
          >
            <select>
            <option key="0">全部</option>
            {
              this.state.plateList.map((item)=>{
              return <option value={item.id} key={item.id}>{item.name}</option>
              })
            }
            </select>
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[
              {
                required: true,
                message: '请输入内容',
              },
            ]}
          >
            <TextArea rows={4}/>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}
          style={{ textAlign: "center" }}
        >
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
        </Form>
        
      </Modal>
    </div>
  }
}

export default NoticeManagement