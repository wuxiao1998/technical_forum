import React, { Fragment } from 'react'
import {HashRouter,Route,Link,Switch } from 'react-router-dom'
import './css/App.css'
import LoginForm from './components/authentication/LoginForm'
import HomePage from './components/home/HomePage'
import Register from './components/authentication/Register'
import Success from './components/authentication/Success'
import MyPost from './components/home/MyPost'
import UserInfo from './components/home/UserInfo'
import MyHeader from './components/Layout/MyHeader'
import NoLogin from './components/authentication/NoLogin'
import EmailCheck from './components/authentication/EmailCheck'

import { Layout, Menu, Breadcrumb } from 'antd';
const {  Content, Footer } = Layout;
class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
          login:"登录",
        
        }
    }
    componentWillMount(){
      console.log("wddw")
    }


    render(){
        return <HashRouter>
          <Switch>
          <Route exact path='/login' component={LoginForm}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/success' component={Success}></Route>
          <Route exact path='/emailcheck' component={EmailCheck}></Route>
         
          <Layout>
          <MyHeader></MyHeader>
        <Content className="site-layout" >
          <div className="site-layout-background" style={{minHeight: 380,height:'620px',
        }}>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/home/homepage' component={HomePage}></Route>
          <Route exact path='/home/mypost' component={MyPost}></Route>
          <Route exact path='/home/userinfo'  component={UserInfo}></Route>
          <Route exact path='/nologin' component={NoLogin}></Route>
          <Footer style={{ textAlign: 'center',background:"#001529",color:"#ffffff"}}>上海杉达学院  ©2020 Created by Ant UED</Footer>
          </div>
        </Content>
      </Layout>
      
      </Switch>
    </HashRouter>

    }

}

    export default App