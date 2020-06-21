import React from 'react';
import Axios from 'axios';
import { Table, Popconfirm, Space, Button, Typography, Modal, Form, Input, message } from 'antd';
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

//申请管理组件
class ApplyInfoManagement extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
      visible: false,
      plateList: [],
      columns: [

        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '申请人',
          dataIndex: 'user',
          key: 'user',
          render: text => <Paragraph style={{ width: '200px' }} ellipsis>{text}</Paragraph>,
        },
        {
          title: '申请时间',
          dataIndex: 'createtime',
          key: 'createtime',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '类型',
          key: 'type',
          dataIndex: 'type',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (

            <Space size="middle">
              <Button onClick={this.showDetail.bind(this,record)}>查看详情</Button>
              <Popconfirm title="确定要删除吗？" okText="Yes" cancelText="No" onConfirm={this.deleteNotice.bind(this, record.key)}>
              <Button>删除</Button>
              </Popconfirm>
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

  //新增公告
  addNotice = () => {
    this.setState({
      visible: true
    })

  }

  //跳转详情页面
  showDetail = (record)=>{
   this.props.history.push({
     pathname:'/noticedetail',
     state:record
   })

  }

  //删除公告方法
  deleteNotice = (noticeId) => {
    Axios.delete('/notice/delete?noticeId=' + noticeId).then(res => {
      console.log('length',this.state.noticeList )
      //当一页只有一条数据时,进行删除后刷新页面
      if(this.state.noticeList.length == 1){
      
        this.loadingData(this.state.pagination.current - 1)
      }else{
      this.loadingData(this.state.pagination.current)
      }
      message.success("删除成功")
     
    })
  }

  //弹窗关闭
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  //弹窗显示
  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  //组件加载时查询数据
   componentWillMount() {
    this.loadingData(this.state.pagination.current)
    Axios.get('/plate/findAll').then(res => {
      this.setState({
        plateList: res.data
      })
    })
  

  }

  //保存公告,成功时回调
  onFinish = values => {
    console.log('Received values of form: ', values);
    Axios.post('/notice/create', {
      title: values.title,
      content: values.content,
      plate: {
        id: values.plate == '全部' ? null : values.plate,
      }
    }).then(res => {
      this.loadingData(this.state.pagination.current)
      message.success("添加成功")
      this.setState({
        visible: false
      })

    })
  }


  //查询接口
   loadingData =   (pageNo) => {
    let datasource = [];
     Axios.get('/user/findAll').then(res => {
      console.log(res)
      let data = res.data.content
      data.map(item => {
        let notice = {
        //   key: item.id.toString(),
        //   title: item.title,
        //   content: item.content,
        //   plateId: item.plate ? item.plate.name : '全部',
        //   createtime: item.createtime,
        //   username: item.createUser ? item.createUser.username : ''
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
    return <div style={{ minHeight: '80vh', marginTop: "5%", marginLeft: "3%", marginRight: "3%", marginBottom: "3%", }}>
      <Button onClick={this.addNotice} style={{ marginBottom: '20px' }}>新增公告</Button>
      <Table columns={this.state.columns}
        onChange={this.handleTableChange}
        dataSource={this.state.noticeList}
        pagination={this.state.pagination} />
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
                max: 20,
                message: '标题过长'
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
                this.state.plateList.map((item) => {
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
            <TextArea rows={4} />
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

export default ApplyInfoManagement