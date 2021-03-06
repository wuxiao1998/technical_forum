import React from 'react'
// import {render} from 'react-dom'
// import axios from 'axios'
//测试
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
//登录页面组件
class LoginFrom extends React.Component {
  constructor() {
    super()
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
    axios.post("/user/login", {
      username: values.username,
      password: values.password
    }).then((response) => {
      console.log(response)
      var path = {
        pathname: '/home/homepage/' + sessionStorage.getItem("plateKey"),
        state: response.data
      }
      sessionStorage.setItem("user", JSON.stringify(response.data))
      console.log('this.props',this.props)
      if(this.props.location.search){
        this.props.history.goBack();
      }else{
        this.props.history.push(path)
      }
    
    })
  };
  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1>技术论坛登录</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            style={{ width: "500px" }}
            placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            style={{ width: "500px" }}
          />
        </Form.Item>
        <Form.Item>
          <Link className="login-form-forgot" to='/forgetpassword'>
            忘记密码?
        </Link>
        </Form.Item>
        <Form.Item>
          <Link to='/register'>没有账号?点击注册</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
        </Button>
          <Button style={{ marginLeft: "20px" }} onClick={this.goBack}>
            返回
          </Button>
        </Form.Item>
      </Form>
    </div>
  }
}

export default LoginFrom