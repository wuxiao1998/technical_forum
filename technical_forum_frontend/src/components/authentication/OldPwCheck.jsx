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
//用户旧密码验证组件
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


class OldPwCheck extends React.Component {


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
    console.log("验证旧密码页")
  }



  changeoldpassword = (e) => {
    console.log(e.target.value)
    this.setState({
      password: e.target.value
    })
  }
  updatePassword = values => {
    console.log(this.state.user.id, 'userid')
    console.log(this.state.password, 'input内容')
    console.log('Received values of form: ', values);
    Axios.post('/user/checkPassword', {
      userId: this.state.user.id,
      password: this.state.password,
    }).then(() => {
      var path = {
        pathname: '/newpwupdate',
      }
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
        <h1>密码验证</h1>
        <Form
          name="normal_oldpasswordcheck"
          className="oldpasswordcheck-form"
        >
          <Form.Item
            name="verificationcode"
            rules={[{ required: true, message: '请输入你的旧密码!' }]}
          >
            <Input prefix={<VerifiedOutlined className="site-form-item-icon" />}
              style={{ width: "250px" }}
              name="oldpassword"
              type="password"
              value={this.state.password}
              onChange={this.changeoldpassword}
              placeholder="旧密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.updatePassword} className="oldpasswordcheck-button">
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

export default OldPwCheck