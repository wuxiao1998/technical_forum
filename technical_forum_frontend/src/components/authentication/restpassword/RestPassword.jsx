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
class RestPassword extends React.Component {
    constructor() {
        super()
        this.state={
            current:1,
        }
      }

      onFinish = values => {
        console.log('Received values',values)
        this.props.history.push('/restsuccess')
        }
       

      render(){
        return <div style={{width:'80%',marginTop:100,marginLeft:100}}>
            <Steps current={this.state.current}>
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
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="comfire"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入确认密码!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('两次密码不正确!');
            },
          }),
        ]}
      >
        <Input.Password />
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
export default RestPassword