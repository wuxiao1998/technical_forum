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
  message,
  Upload
} from 'antd';
import Axios from 'axios';
import NoLogin from '../authentication/NoLogin'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
//用户个人信息组件
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


class UserInfo extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(sessionStorage.getItem("user")),
      visible: false,
      loginin: true,
      nickname: JSON.parse(sessionStorage.getItem("user")) !== null ? JSON.parse(sessionStorage.getItem("user")).nickname : "",
      phone: JSON.parse(sessionStorage.getItem("user")) !== null ? JSON.parse(sessionStorage.getItem("user")).phone : "",
      gender: JSON.parse(sessionStorage.getItem("user")) !== null ? JSON.parse(sessionStorage.getItem("user")).gender : "",
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      uploadfile:'',
      imageUrl:"http://localhost:8000/forum/image/",
      fileobj:'',
    
    }
    this.showModa = this.showModa.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }



  componentWillMount() {
    if (!sessionStorage.getItem("user")) {
      this.setState({
        loginin: false
      })
    }else{
      let userImage = JSON.parse(sessionStorage.getItem("user")) !== null ? JSON.parse(sessionStorage.getItem("user")).id + '.jpg': "";
      this.setState({
        imageUrl:this.state.imageUrl+userImage
      })
    }

  }


  onFinish =  async values => {
    this.setState({
      visible: false,
    });
    console.log('Received values of form: ', values);
    await Axios.post('/user/updateUser', {
      nickname: this.state.nickname,
      gender: this.state.gender,
      phone: this.state.phone,
    }).then(res => {
      let config = {
        headers: {

          "Content-Type": "multipart/form-data"
        }
      };
      let formData = new FormData();
      console.log(this.state.fileobj,'fileobj')
      formData.append("file", this.state.fileobj);
      Axios.post('/user/upload?uploadType=update', formData, config)
      let user = JSON.parse(sessionStorage.getItem("user"));
      user.gender = this.state.gender;
      user.nickname = this.state.nickname;
      user.phone = this.state.phone;
      sessionStorage.setItem("user", JSON.stringify(user));
      message.success('更新成功!!!');
      //刷新页面
      window.location.reload();
    })
    
  


  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 jpeg或者png格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不准超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (!info.file.originFileObj) {
      message.error('请上传图片!');
      return;
    }
    this.getBase64(info.file.originFileObj, imageUrl =>
      this.setState({
        imageUrl,
        loading: false,
        fileobj:info.file.originFileObj
      }),
    );
  }
  updatePassword = values => {
      this.props.history.push('/oldpwcheck');
  };

  getValue = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      gender: e.target.value,
    });
  };

  showModa() {
    this.setState({
      visible: true,
    });
  };

  hideModal() {
    this.setState({
      visible: false,
    });
  };

  changeNickName = (e) => {
    console.log(e.target.value)
    this.setState({
      nickname: e.target.value
    })
  }
  changePhone = (e) => {
    console.log(e.target.value)
    this.setState({
      phone: e.target.value
    })
  }
  render() {
    document.body.style.backgroundColor = '#F0F2F5';//将整个页面背景色改为灰色，解决有背景没被渲染出现白色；（副作用容易造成重绘影响性能，暂未发现影响）
    const { imageUrl } = this.state;
    let element;
    if (this.state.loginin) {
      element = <div>
        <Modal
          title="提醒"
          visible={this.state.visible}
          onOk={this.onFinish}//这里之后要传值
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>是否确认修改?</p>
        </Modal>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ textAlign: "center", display: "inline-block", left: '-50%' }}>个人信息</h1>
          <a onClick={this.updatePassword} style={{ float: 'right' }}>修改密码</a>
        </div>

        <Descriptions bordered style={{ backgroundColor: "white" }}>
          <Descriptions.Item label="用户名" span={3}>{this.state.user.username}</Descriptions.Item >
          <Descriptions.Item label="头像" span={3}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="#"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
              fileList={this.state.fileList}
              value={this.state.uploadfile}
            >
                         {console.log('242id',this.state.imageUrl)}
              <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> 
            </Upload>
          </Descriptions.Item >
          <Descriptions.Item label="邮箱" span={3}>{this.state.user.email}</Descriptions.Item>
          <Descriptions.Item label="昵称" span={3}><Input id="nickname" value={this.state.nickname} style={{ width: "300px" }} onChange={this.changeNickName}></Input></Descriptions.Item>
          <Descriptions.Item label="经验">{this.state.user.experience}</Descriptions.Item>
          <Descriptions.Item label="等级">{this.state.user.level}</Descriptions.Item>
          <Descriptions.Item label="称号">{this.state.user.designation}</Descriptions.Item>
          <Descriptions.Item label="性别" span={3}>
            <Radio.Group name="gender" value={this.state.gender}>
              <Radio value='男' onChange={(e) => this.getValue(e)} >男</Radio>
              <Radio value='女' onChange={(e) => this.getValue(e)} >女</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="手机号" ><Input id="phone" value={this.state.phone} style={{ width: "300px" }} onChange={this.changePhone}></Input></Descriptions.Item>
        </Descriptions>
        <div style={{ textAlign: "center" }}>

        </div>
        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={this.showModa.bind(this)}>
            修改
          </Button>
         </div>
      </div>
    } else {
      element = <NoLogin history={this.props.history}></NoLogin>
    }
    return <div style={{ minHeight: '80vh', marginTop: "5%", marginLeft: "3%" , marginRight: "3%", marginBottom: "3%",}}>
      {element}
    </div>
  }



}

export default UserInfo