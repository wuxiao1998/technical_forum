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
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
          user:JSON.parse(sessionStorage.getItem("user")),
          visible:false,
          loginin:true,
          nickname:JSON.parse(sessionStorage.getItem("user"))!==null?JSON.parse(sessionStorage.getItem("user")).nickname:"",
          phone:JSON.parse(sessionStorage.getItem("user"))!==null?JSON.parse(sessionStorage.getItem("user")).phone:"",
          gender:JSON.parse(sessionStorage.getItem("user"))!==null?JSON.parse(sessionStorage.getItem("user")).gender:"",
        }
        this.showModa=this.showModa.bind(this);
        this.hideModal=this.hideModal.bind(this);
        console.log(this.state)
    }



    componentWillMount(){
      if(!sessionStorage.getItem("user")){
        this.setState({
          loginin:false
         })
      }
  }
  

    onFinish = values => {
      this.setState({
        visible: false,
      });
        console.log('Received values of form: ', values);
        Axios.post('/user/updateUser',{
            nickname:this.state.nickname,
            gender:this.state.gender,
            phone:this.state.phone,
        }).then(res=>{
            message.success('更新成功!!!');
            //this.props.history.push('/home/homepage');
        })
        let user = JSON.parse(sessionStorage.getItem("user"));
        user.gender = this.state.gender;
        user.nickname = this.state.nickname;
        user.phone = this.state.phone;
        sessionStorage.setItem("user",JSON.stringify(user));
        
        
      };

    goBack = () =>{
       this.props.history.goBack();
    }
    getValue = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          gender: e.target.value,
        });
      };

      showModa(){
        this.setState({
          visible: true,
        });
      };
    
      hideModal(){
        this.setState({
          visible: false,
        });
      };
    
      changeNickName = (e)=>{
console.log(e.target.value)
this.setState({
  nickname:e.target.value
})
      }
      changePhone = (e)=>{
        console.log(e.target.value)
        this.setState({
          phone:e.target.value
        })
              }
    render(){
      let element;
      if(this.state.loginin){
          element=<div>
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
        <h1 style={{textAlign:"center"}}>个人信息</h1>
        <Descriptions   bordered style={{backgroundColor:"white"}}>
    <Descriptions.Item label="用户名"  span={3}>{this.state.user.username}</Descriptions.Item >
    <Descriptions.Item label="邮箱" span={3}>{this.state.user.email}</Descriptions.Item>
    <Descriptions.Item label="昵称"  span={3}><Input id="nickname" value={this.state.nickname} style={{width:"300px"}} onChange={this.changeNickName}></Input></Descriptions.Item>
    <Descriptions.Item label="经验">{this.state.user.experience}</Descriptions.Item>
    <Descriptions.Item label="等级">{this.state.user.level}</Descriptions.Item>
    <Descriptions.Item label="称号">{this.state.user.designation}</Descriptions.Item>
    <Descriptions.Item label="性别" span={3}>
        <Radio.Group name="gender" value={this.state.gender}> 
          <Radio value={1}  onChange={(e)=>this.getValue(e)} >男</Radio>
          <Radio value={2}  onChange={(e)=>this.getValue(e)} >女</Radio>
        </Radio.Group>
    </Descriptions.Item>
    <Descriptions.Item label="手机号" ><Input  id="phone" value={this.state.phone} style={{width:"300px"}} onChange={this.changePhone}></Input></Descriptions.Item>
  </Descriptions>
  <div style={{textAlign:"center"}}>
  <Button type="primary" onClick={this.showModa.bind(this)}>
            修改
          </Button>
          <Button style={{marginLeft:"20px"}} onClick={this.goBack}>
            返回
          </Button></div>
        </div>
      }else{
          element=<NoLogin history={this.props.history}></NoLogin>
      }
        return <div style={{marginTop:"5%",minHeight: '80vh'}}>
          {element}
          </div>
    }

    

}

    export default UserInfo