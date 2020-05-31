import React from 'react'
// import {render} from 'react-dom'
// import axios from 'axios'
//测试
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom'
import { VerifiedOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
class EmailCheck extends React.Component{
    constructor(){
        super()
    }

    goBack = () =>{
      this.props.history.goBack();
   }

    render(){
        return <div  style={{textAlign:"center",marginTop:"10%"}}>
          <h1>邮箱验证</h1>
          <div>我们已经向您的邮箱发送了验证码</div>
        <Form
      name="normal_emailcheck"
      className="emailcheck-form"
    >
      <Form.Item
        name="verificationcode"
        rules={[{ required: true, message: 'Please input your Verification Code!' }]}
      >
        <Input prefix={<VerifiedOutlined className="site-form-item-icon" /> } 
         style={{width:"250px"}}
        placeholder="Verification Code" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="emailcheck-button">
      确认
        </Button>
        <Button style={{marginLeft:"20px"}} onClick={this.goBack}>
            返回
          </Button>
      </Form.Item>
    </Form>
    </div>
    }
}

export default EmailCheck