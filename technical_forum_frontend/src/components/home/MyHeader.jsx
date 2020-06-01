import React from 'react'
import {Link} from 'react-router-dom'
import { Popconfirm } from 'antd';
import { Layout, Menu} from 'antd';
import { withRouter } from 'react-router';
const { Header} = Layout;


class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            login:{},
            url:{}
        }
    }

    componentWillMount(){
        this.setState({
            login:JSON.parse(sessionStorage.getItem("user"))
        })
    }

    distoryUser =()=>{
        sessionStorage.removeItem("user");
        this.setState({
            login:null
        })
        console.log(this)
        this.props.history.push('/');
    }
    render(){
        return   <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} >
          <Menu.Item key="1"><Link to='/home/main'>首页</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/home/myinfo'>我的贴子</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/home/UserInfo' >用户信息</Link></Menu.Item>
          <Menu.Item key="4" style={{float:"right"}} onClick={this.distoryUser}>{this.state.login?'注销':''}</Menu.Item>
          <Menu.Item key="5" style={{float:"right"}}><Link to='/register'>注册</Link></Menu.Item>
          <Menu.Item key="6" style={{float:"right"}}><Link to={this.state.login?'/home/UserInfo':'/login'}>{this.state.login?'欢迎您,'+this.state.login.username:'登录'}</Link></Menu.Item>
        
        </Menu>
      </Header>
    }
}

export default withRouter(MyHeader)