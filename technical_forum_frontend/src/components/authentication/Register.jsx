import React from 'react';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Radio,
  Row,
  Col
} from 'antd';
import Axios from 'axios';
import LoadingButton from '../utils/LoadingButton'


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
        Axios.post('/user/register',{
            username:values.username,
            password:values.password,
            email:values.email,
            gender:values.gender,
            code:values.code,
            nickname:values.nickname,
            phone:values.phone
        }).then(res=>{
            console.log(res);
              this.props.history.push('/success')
            
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

      sendCode = ()=>{
        let email = this.refs.email.state.value;
        Axios.post('/mail/sendCode',{
          email:email
        }).then(res=>{
          console.log(res);
        })
      }
     
    render(){
      
        return <div>
        <h1 style={{textAlign:"center"}}>技术论坛注册</h1>
        <Form
        {...formItemLayout}
        name="register"
        style={{marginRight:"300px",marginTop:"30px"}}
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
            // ({ getFieldValue }) => ({
            //   validator(rule, value) {
            //    Axios.post('/mail/sendCode',{
            //      email:value
            //    }).then(res=>{
            //     return Promise.resolve();
            //    })
            //    return Promise.reject('该用户名已被使用!!!');
            //   },
            // }),
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
        <Form.Item
          name="nickname"
          label="昵称"
          rules={[
            {
              required: true,
              message: '请输入昵称',
            },
          ]}
          hasFeedback
        >
          <Input />
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
          name="phone"
          label="手机"
          rules={[
            {
              required: true,
              message: '请输入手机',
            },
          ]}
        >
          <Input />
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
          <Input  ref="email"/>
        </Form.Item>
        <Form.Item
          name="code"
          label="验证码"
        >
          <Row gutter={10}>
          <Col span={4}>
        <Form.Item
          name="code"
          label=""
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        >
          <Input style={{width:"100px",marginRight:"20px"}}/>
        </Form.Item>
        </Col>
        <Col span={4}>
        <LoadingButton
                    onClick={
                    this.sendCode
        }// 点击按钮的回调
                    text="发送"// 按钮文字
                    waitTime={30}// 等待时间
                />
              </Col>
          </Row>
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