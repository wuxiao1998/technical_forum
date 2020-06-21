import React from 'react';
import axios from 'axios';
import { Form, Input, InputNumber, Button, message,Select } from 'antd';
import NoLogin from '../../authentication/NoLogin'
const {Option} = Select
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
class ApplyPostHost extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      plateId: this.props.match.params.plateid,
      loginin: true,
      plateList:[]
    }
  }
  componentWillMount() {
    if (!sessionStorage.getItem("user")) {
      this.setState({
        loginin: false
      })
    }
    axios.get('/plate/findAll').then(res => {
      this.setState({
        plateList: res.data
      })
    })
  }
  onFinish = values => {
    console.log('Received values of form: ', values);
    axios.post('/applyInfo/saveApplyInfo', {
     content:values.content,
     plateId:this.state.plateId
    }).then(res => {
      message.success("申请成功,管理员会在三个工作日之内给予回复")
      this.props.history.push('/home/homepage/' + this.state.plateId);
      
    })
  };
  goBack = () => {
    this.props.history.goBack();
  }
  render() {
    let element;
    if (this.state.loginin) {
      element = <div><h2 style={{textAlign:'center',marginBottom: '40px' }}>申请版主</h2>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
        <Form.Item
            name="plate"
            label="申请板块"
          >
            <Select defaultValue={parseInt(this.state.plateId)} disabled>
              {
                this.state.plateList.map((item) => {
                  console.log(parseInt(this.state.plateId))
                  console.log(item.id)
                  return <Option value={item.id} key={item.id}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item name="content" label="申请理由"
          rules={[
            {
              required: true,
              message: '请输入申请理由',
            },
            {
              max:100,
              message:'申请理由最多不超过100字!!!'
            }
          ]}
          >
            <Input.TextArea style={{height:'150px'}}/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11}}>
            <Button type="primary" htmlType="submit">
              发布
              </Button>
            <Button type="default" style={{ marginLeft: '40px' }} onClick={this.goBack}>
              返回
              </Button>
          </Form.Item>
        </Form>
      </div>
    } else {
      element = <div>
        <NoLogin history={this.props.history}></NoLogin>
      </div>
    }
    return <div style={{ marginTop: '10%' }}>
      {element}
    </div>
  }
}

export default ApplyPostHost