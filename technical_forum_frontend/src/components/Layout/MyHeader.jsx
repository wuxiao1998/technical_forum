import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router';
const { Header } = Layout;

//主页头部布局组件
class MyHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: {},
        }
    }

    componentWillMount() {
        //设置login值,判断用户当前是否登录
        this.setState({
            login: JSON.parse(sessionStorage.getItem("user"))
        })

    }

    distoryUser = () => {
        sessionStorage.removeItem("user");
        this.setState({
            login: null
        })
        this.props.history.push('/home/homepage/' + sessionStorage.getItem("plateKey"));
    }
    render() {
        return <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
            <div class="logo" style={{backgroundColor:'transparent',marginTop:'1px'}}>
                <span style={{color:'white',fontWeight:700,fontSize:'20px'}}>
                IT技术论坛
                </span>
                </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.hash.split('/')[2]]} >
                <Menu.Item key="homepage"><Link to={'/home/homepage/' + sessionStorage.getItem("plateKey")}>首页</Link></Menu.Item>
                <Menu.Item key="mypost"><Link to='/home/mypost'>我的论坛</Link></Menu.Item>
                <Menu.Item key="userinfo"><Link to='/home/userinfo' >用户信息</Link></Menu.Item>
                {sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user")).role === '管理员'&&<Menu.Item key="noticemanagement">
                    <Link to='/home/noticemanagement' >公告管理</Link></Menu.Item>}
                <Menu.Item key="4" style={{ float: "right" }} onClick={this.distoryUser}>{this.state.login ? '注销' : ''}</Menu.Item>
                {!this.state.login &&<Menu.Item key="5" style={{ float: "right" }}><Link to='/register'>注册</Link></Menu.Item>}
                <Menu.Item key="6" style={{ float: "right" }}><Link to={this.state.login ? '/home/userinfo' : '/login'}>{this.state.login ? '欢迎您,' + this.state.login.username : '登录'}</Link></Menu.Item>

            </Menu>
        </Header>
    }
}

export default withRouter(MyHeader)