import React, { Fragment } from 'react'
import {HashRouter,Route,Link,Switch } from 'react-router-dom'
import './css/App.css'
import LoginForm from './components/authentication/LoginForm'
import HomePage from './components/home/HomePage'
import Register from './components/authentication/Register'
import Success from './components/authentication/Success'
import EmailCheck from './components/authentication/EmailCheck'
import HomeRouter from './components/home/HomeRouter'
import AddPost from './components/home/forumpost/AddPost'
import OldPwCheck from './components/authentication/OldPwCheck'
import NewPwUpdate from './components/authentication/NewPwUpdate'
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
          <Route exact path='/' component={HomeRouter}></Route>
          <Route  path='/home' component={HomeRouter}></Route>
          <Route  path='/forumpost/add/:id' component={AddPost}></Route>
          <Route   path='/oldpwcheck' component={OldPwCheck}></Route>
          <Route   path='/newpwupdate' component={NewPwUpdate}></Route>
      
{/*         
          <Layout>
          <MyHeader></MyHeader>
        <Content className="site-layout" >
          <div className="site-layout-background" style={{minHeight: 380,height:'620px'}}>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/home/homepage' component={HomePage}></Route>
          <Route exact path='/home/mypost' component={MyPost}></Route>
          <Route exact path='/home/userinfo'  component={UserInfo}></Route>
          <Route exact path='/nologin' component={NoLogin}></Route>
          <Footer style={{ textAlign: 'center',background:"#001529",color:"#ffffff"}}>上海杉达学院  ©2020 Created by Ant UED</Footer>
          </div>
        </Content>
      </Layout> */}
      
      </Switch>
    </HashRouter>

    }

}

    export default App