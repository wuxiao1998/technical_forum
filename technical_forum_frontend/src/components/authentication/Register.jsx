import React from 'react';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Radio,
  AutoComplete,
} from 'antd';
import Axios from 'axios';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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
      offset: 8,
    },
  },
};


class Register extends React.Component{


    constructor(props){
        super(props)
        this.state = {
            gender:1
        }
    }



    onFinish = values => {
        console.log('Received values of form: ', values);
        Axios.post('http://localhost:8000/forum/user/register',{
            username:values.username,
            password:values.password,
            email:values.email,
            gender:values.gender
        }).then(res=>{
            console.log(res);
            this.props.history.push('/success');
        }).catch(response=>{
            console.log(response);
        })
      };

    goBack = () =>{
       this.props.history.goBack();
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    render(){
        return <div style={{marginTop:"10%"}}>
        <h1 style={{textAlign:"center"}}>技术论坛注册</h1>
        <Form
        {...formItemLayout}
        name="register"
        style={{marginRight:"300px",marginTop:"50px"}}
        onFinish={this.onFinish}
        scrollToFirstError
        initialValues={{
          }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不同!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="gender" label="性别"
         rules={[
            {
              required: true,
              message: '请选择性别',
            },
          ]}
        >
        <Radio.Group > 
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
      </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: 'email',
              message: '请输入正确的邮箱格式',
            },
            {
              required: true,
              message: '请输入邮箱',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          style={{textAlign:"center"}}
          rules={[
            { validator:(_, value) => value ? Promise.resolve() : Promise.reject('请接受服务条款') },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
           我已阅读 <a href="">服务条款</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}
         style={{textAlign:"center"}}
        >
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button style={{marginLeft:"20px"}} onClick={this.goBack}>
            返回
          </Button>
        </Form.Item>
      </Form>
      </div> 
    }

}

    export default Register