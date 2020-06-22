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
      applyInfoList: [],
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
          title: '申请板块',
          key: 'plateId',
          dataIndex: 'plateId',
        }, 
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (

            <Space size="middle">
              {record.status == '未处理' &&<Button onClick={this.accept.bind(this,record)}>同意</Button>}
              {record.status == '未处理' &&<Button onClick={this.unaccept.bind(this,record)}>驳回</Button>}
              <Button onClick={this.showDetail.bind(this,record.userobject)}>查看用户详情</Button>
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
  accept = (record)=>{
    console.log('record',record)
    Axios.post('/applyInfo/grantModeratorToUser/'+record.key,{
      userId:record.userobject.id,
      plateId:record.plate.id
    }).then(res=>{
      this.loadingData(this.state.pagination.current)
      message.success('操作成功!!!')
    
    })
  }
  unaccept = (record)=>{
    Axios.post('/applyInfo/rejectApply',{
      id:record.key,
      applyUser:{
         id:record.userobject.id
      },
      plate:{
        name:record.plate.name
      }
    }).then(res=>{
      this.loadingData(this.state.pagination.current)
      message.success('操作成功!!!')
    })
  }

  //跳转详情页面
  showDetail = (user)=>{
  console.log('user',user)
   this.props.history.push({
     pathname:'/home/persondata',
     state:{
       userid:user.id,
       gender:user.gender,
       nickname:user.nickname,
       role:user.role,
       experience:user.experience,
       level:user.level,
       designation:user.designation
     }
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
     Axios.get('/applyInfo/showApplyInfo?pageNo='+pageNo+'&pageSize='+this.state.pagination.pageSize)
     .then(res => {
      console.log(res)
      let data = res.data.content
      data.map(item => {
        let notice = {
          key: item.id.toString(),
          user: item.applyUser.username,
          content: item.content,
          plateId: item.plate.name,
          createtime: item.createtime,
          status:item.status,
          userobject:item.applyUser,
          plate:item.plate
        
        }
        datasource.push(notice)
      })
      this.setState({
        applyInfoList: datasource,
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
      <Table columns={this.state.columns}
        onChange={this.handleTableChange}
        dataSource={this.state.applyInfoList}
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