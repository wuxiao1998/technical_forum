import React, { Fragment } from 'react'
import {HashRouter,Route,Link,Switch} from 'react-router-dom'
import './css/App.css'
import LoginForm from './components/authentication/LoginForm'
import Main from './components/home/Main'
import Register from './components/authentication/Register'
import Success from './components/authentication/Success'
import MyInfo from './components/home/MyInfo'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        return <HashRouter>
          <Switch>
          <Route exact path='/' component={LoginForm}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/success' component={Success}></Route>
          <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to='/home/main'>首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/home/myinfo'>我的贴子</Link></Menu.Item>
            <Menu.Item key="3">用户信息</Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380,height:'800px' }}>
          <Route exact path='/home/main' component={Main}></Route>
          <Route exact path='/home/myinfo' component={MyInfo}></Route>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>上海杉达学院 ©2020 Created by Ant UED</Footer>
      </Layout>
      </Switch>
    </HashRouter>

    }

}

    export default App