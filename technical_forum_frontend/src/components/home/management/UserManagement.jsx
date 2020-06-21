import React from 'react';
import Axios from 'axios';
import { Table, Popconfirm, Space, Button, Typography, Modal, Form, Input, message,Select } from 'antd';
const { Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
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

//用户管理组件
class UserManagement extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
      visible: false,
      visible2: false,
      plateList: [],
      userList: [],
      username: '',
      userid: '',
      role:'',
      columns: [

        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname',
          render: text => <Paragraph style={{ width: '200px' }} ellipsis>{text}</Paragraph>,
        },
        {
          title: '等级',
          dataIndex: 'level',
          key: 'level',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '权限',
          key: 'role',
          dataIndex: 'role',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            
            <Space size="middle">
              <Button onClick={this.showDetail.bind(this, record)}>查看详情</Button>
              <Button onClick={this.roleChange.bind(this, record)}>更改权限</Button>
              <Button onClick={this.banUser.bind(this, record)}>封禁</Button>
              <div >
              <Popconfirm title="确定要解封吗？" okText="Yes" cancelText="No" onConfirm={this.resumeUser.bind(this, record)}>
                <Button>解封</Button>
              </Popconfirm>
              </div>
            </Space>
          ),
        },
      ],//构造表格列属性
      pagination: {
        current: 1,
        pageSize: 10
      }//表格分页属性
    }
  }

  //封禁确认
  banUser = (record) => {
    this.setState({
      visible: true,
      username: record.username,
      userid: record.id,
    })
  }

  //更改权限确认
  roleChange = (record) => {
    this.setState({
      visible2: true,
      username: record.username,
      userid: record.id,
      role:record.role
    })
  }

  //跳转详情页面
  showDetail = (record) => {
    this.props.history.push({
      pathname: '/home/persondata',
      state: record
    })

  }

  //解封用户方法
  resumeUser = (record) => {
    // Axios.delete('/notice/delete?noticeId=' + record.id).then(res => {

    //   message.success("解封成功")

    // })
  }

  //弹窗关闭(封禁帐号)
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  //弹窗关闭(权限更改)
  handleCancel2 = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible2: false,
    });
  };

  //弹窗显示(封禁帐号)
  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  //弹窗显示(权限更改)
  handleOk2 = () => {
    this.setState({
      visible2: false
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

  //保存封禁内容,成功时回调
  onFinish = values => {
    console.log('Received values of form: ', values);
    Axios.post('/notice/create', {
      title: values.title,
      content: values.content,
    }).then(res => {
      this.loadingData(this.state.pagination.current)
      message.success("封禁成功")
      this.setState({
        visible: false
      })

    })
  }

  //保存状态更改,成功时回调
  onFinish2 = values => {
    console.log('Received values of form: ', values);
    Axios.post('/notice/create', {
      title: values.title,
      content: values.content,
    }).then(res => {
      this.loadingData(this.state.pagination.current)
      message.success("状态更改成功")
      this.setState({
        visible: false
      })

    })
  }


  //查询接口
  loadingData = (pageNo) => {
    let datasource = [];
    Axios.get('/user/findAll/' + pageNo + '/' + this.state.pagination.pageSize).then(res => {
      let data = res.data.content
      data.map(item => {
        let user = {
          key: item.id.toString(),
          username: item.username,
          nickname: item.nickname,
          level: item.level,
          status: item.status,
          role: item.role,
          userid: item.id,
          designation: item.designation,
          gender: item.gender
        }
        datasource.push(user)
      })
      this.setState({
        noticeList: datasource,
        pagination: {
          current: pageNo,
          pageSize: 10,
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
      {/* <Button onClick={this.addNotice} style={{ marginBottom: '20px' }}>新增公告</Button> */}
      <Table columns={this.state.columns}
        onChange={this.handleTableChange}
        dataSource={this.state.noticeList}
        pagination={this.state.pagination} />
      <Modal
        title="封禁用户"
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
            name="name"
            label="用户名"
          >
            {this.state.username}
          </Form.Item>
          <Form.Item
            name="content"
            label="封禁理由"
            rules={[
              {
                required: true,
                message: '请输入封禁理由',
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

      <Modal
        title="更改用户权限"
        visible={this.state.visible2}
        maskClosable={false}
        destroyOnClose={true}
        onOk={this.handleOk2}
        footer={null}
        onCancel={this.handleCancel2}
      >
        <Form
          {...formItemLayout}
          name="register"
          onFinish={this.onFinish2}
          scrollToFirstError
          initialValues={{
          }}
        >
          <Form.Item
            name="name"
            label="用户名"
          >
            {this.state.username}
          </Form.Item>
          <Form.Item
            name="content"
            label="权限"
            rules={[
              {
                required: true,
                message: '请选择权限',
              },
            ]}
          >
            <Select defaultValue={this.state.role} style={{ width: 120 }}>
              <Option value="管理员">管理员</Option>
              <Option value="版主">版主</Option>
              <Option value="普通用户">普通用户</Option>
            </Select>
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

export default UserManagement