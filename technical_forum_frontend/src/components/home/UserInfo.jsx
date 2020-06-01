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
  Modal
} from 'antd';
import Axios from 'axios';
import NoLogin from '../authentication/NoLogin'
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
        }
        this.showModa=this.showModa.bind(this);
        this.hideModal=this.hideModal.bind(this);
    }


    componentWillMount(){
      if(!sessionStorage.getItem("user")){
         this.setState({
          loginin:false
         })
      }
  }
  

    onFinish = values => {
        console.log('Received values of form: ', values);
        Axios.post('/user/UserInfo',{
            nickname:values.nickname,
            gender:values.gender,
            phone:values.phone,
        }).then(res=>{
            console.log(res,11111111111);
            this.props.history.push('/home/homepage');
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
    
    render(){
      let element;
      if(this.state.loginin){
          element=<div>
            <Modal
          title="提醒"
          visible={this.state.visible}
          onOk={this.hideModal}//这里之后要传值
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>是否确认修改</p>
        </Modal>
        <h1 style={{textAlign:"center"}}>个人信息</h1>
        <Descriptions   bordered style={{backgroundColor:"white"}}>
    <Descriptions.Item label="用户名"  span={3}>{this.state.user.username}</Descriptions.Item >
    <Descriptions.Item label="邮箱" span={3}>{this.state.user.email}</Descriptions.Item>
    <Descriptions.Item label="昵称"  span={3}><Input id="nickname" defaultValue={this.state.user.nickname} style={{width:"300px"}}></Input></Descriptions.Item>
    <Descriptions.Item label="经验">{this.state.user.experience}</Descriptions.Item>
    <Descriptions.Item label="等级">{this.state.user.level}</Descriptions.Item>
    <Descriptions.Item label="称号">{this.state.user.designation}</Descriptions.Item>
    <Descriptions.Item label="性别" span={3}>
        <Radio.Group id="gender" defaultValue={this.state.user.gender}> 
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
    </Descriptions.Item>
    <Descriptions.Item label="手机号" ><Input  id="phone" defaultValue={this.state.user.phone} style={{width:"300px"}}></Input></Descriptions.Item>
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