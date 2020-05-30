import React from 'react'
// import {render} from 'react-dom'
// import axios from 'axios'
//测试
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
class LoginFrom extends React.Component{
    constructor(){
        super()
    }

    onFinish = values => {
      console.log('Received values of form: ', values);
      axios.post("http://localhost:8000/forum/user/login",{
        username:values.username,
        password:values.password
      }).then((response)=>{
        console.log(response)
        if(response.data.message==='用户名或密码错误')
        {
          alert('用户名或密码错误');
        }
        else{
          this.props.history.push("/home/main")
        }
      }).catch((reson)=>{
        console.log(reson)

      })
     
      
    };

    render(){
        return <div  style={{textAlign:"center",marginTop:"10%"}}>
          <h1>技术论坛登录</h1>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
         style={{width:"500px"}}
        placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          style={{width:"500px"}}
        />
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="">
         忘记密码?
        </a>
      </Form.Item>
      <Form.Item>
      <Link to='/register'>没有账号?点击注册</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
      登录
        </Button>
      </Form.Item>
    </Form>
    </div>
    }
}

export default LoginFrom