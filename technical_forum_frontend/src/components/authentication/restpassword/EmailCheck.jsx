import React from 'react';
import {Steps,Form, Input, Button,} from 'antd';
import Axios from 'axios';
const { Step } = Steps;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 12,
      span: 16,
    },
  };
class EmailCheck extends React.Component {
    constructor() {
        super()
        this.state={
           
        }
      }

      onFinish = values => {
        console.log('Received values',values)
        this.props.history.push('/restpassword')
        }
       

      render(){
        return <div style={{width:'80%',marginTop:100,marginLeft:100}}>
            <Steps current={2}>
            <Step title="填写用户名" description="我们会向您注册时填写的邮箱发送验证码" />
            <Step title="邮箱验证" description="填写验证码,完成验证" />
            <Step title="重置密码" description="重置您的密码" />
        </Steps>
        <br/>
        <br/>
        <br/>
        <Form
      {...layout}
      onFinish={this.onFinish}
    >
     <Form.Item
  label="验证码"
  name="code"
  rules={[{ required: true, message: '请输入验证码!' }]}
>
  <Input />
</Form.Item>
<Form.Item {...tailLayout}>
  <Button type="primary" htmlType="submit">
    下一步
  </Button>
</Form.Item>
    </Form>

        </div>


      }


}
export default EmailCheck