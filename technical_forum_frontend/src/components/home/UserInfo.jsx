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


class UserInfo extends React.Component{


    constructor(props){
        super(props)
        this.state = {
          user:JSON.parse(sessionStorage.getItem("user"))
        }
    }


    componentWillMount(){
      if(!sessionStorage.getItem("user")){
          this.props.history.push('/nologin');
      }
  }
  

    onFinish = values => {
        console.log('Received values of form: ', values);
        Axios.post('http://localhost:8000/forum/user/UserInfo',{
            username:values.username,
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
      console.log(this.state.user)
        return <div style={{marginTop:"10%"}}>
        <h1 style={{textAlign:"center"}}>个人信息</h1>
        <Form
        {...formItemLayout}
        name="UserInfo"
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
        <Form.Item {...tailFormItemLayout}
         style={{textAlign:"center"}}
        >
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button style={{marginLeft:"20px"}} onClick={this.goBack}>
            返回
          </Button>
        </Form.Item>
      </Form>
      </div> 
    }

}

    export default UserInfo