import React from 'react';
import {
  Descriptions,
  Badge,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Radio,
  AutoComplete,
  Modal,
  message
} from 'antd';
import Axios from 'axios';
import NoLogin from '../authentication/NoLogin'
import { VerifiedOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
//修改密码,填写新密码组件
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


class NewPwUpdate extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(sessionStorage.getItem("user")),
      loginin: true,
      password: ''
    }
    console.log(this.state)
  }



  componentWillMount() {
    if (!sessionStorage.getItem("user")) {
      this.setState({
        loginin: false
      })
    }
    console.log("修改新密码页")
  }



  changenewpassword = (e) => {
    console.log(e.target.value)
    this.setState({
      password: e.target.value
    })
  }
  updatePassword = values => {
    console.log('values', values)
    Axios.post('/user/updatePassword', {
      userId: this.state.user.id,
      password: values.confirm,
    }).then(() => {
      message.success('修改密码成功，请重新登录');
      var path = {
        pathname: '/login',
      }
      sessionStorage.removeItem("user");
      this.setState({
        login: null
      })
      this.props.history.push(path)
    })
  };

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    let element;
    if (this.state.loginin) {
      element = <div style={{ textAlign: "center" }}>
        <h1>修改密码</h1>
        <Form
          name="normal_newpasswordcheck"
          className="newpasswordcheck-form"
          onFinish={this.updatePassword}
        >
          <Form.Item
            name="verificationcode"
            rules={[{ required: true, message: '请输入你的新密码!' }]}
          >
            <Input prefix={<VerifiedOutlined className="site-form-item-icon" />}
              style={{ width: "250px" }}
              name="newpassword"
              type="password"
              value={this.state.password}
              placeholder="新密码" />
          </Form.Item>
          <Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['verificationcode']}
              rules={[
                {
                  required: true,
                  message: '两次密码不一致!!!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('verificationcode') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不同!');
                  },
                }),
              ]}
            >
              <Input prefix={<VerifiedOutlined className="site-form-item-icon" />}
                style={{ width: "250px" }}
                name="newpassword"
                type="password"
                placeholder="确认密码" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="newpasswordcheck-button">
              确认
          </Button>
            <Button style={{ marginLeft: "20px" }} onClick={this.goBack}>
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    } else {
      element = <NoLogin history={this.props.history}></NoLogin>
    }
    return <div style={{ marginTop: "5%", minHeight: '80vh' }}>
      {element}
    </div>
  }



}

export default NewPwUpdate