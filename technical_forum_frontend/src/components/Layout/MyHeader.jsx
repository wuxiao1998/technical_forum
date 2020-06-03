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
        }
    }

    componentWillMount(){
        console.log('1111',sessionStorage.getItem("plateKey"))
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
        this.props.history.push('/home/homepage/'+sessionStorage.getItem("plateKey"));
    }
    render(){
        return   <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.hash.split('/')[2]]} >
          <Menu.Item key="homepage"><Link to={'/home/homepage/'+sessionStorage.getItem("plateKey")}>首页</Link></Menu.Item>
          <Menu.Item key="mypost"><Link to='/home/mypost'>我的贴子</Link></Menu.Item>
          <Menu.Item key="userinfo"><Link to='/home/userinfo' >用户信息</Link></Menu.Item>
          <Menu.Item key="4" style={{float:"right"}} onClick={this.distoryUser}>{this.state.login?'注销':''}</Menu.Item>
          <Menu.Item key="5" style={{float:"right"}}><Link to='/register'>注册</Link></Menu.Item>
          <Menu.Item key="6" style={{float:"right"}}><Link to={this.state.login?'/home/userinfo':'/login'}>{this.state.login?'欢迎您,'+this.state.login.username:'登录'}</Link></Menu.Item>
        
        </Menu>
      </Header>
    }
}

export default withRouter(MyHeader)