import React, { Fragment } from 'react'
import {Route,Switch } from 'react-router-dom'
import HomePage from './HomePage'
import MyPost from './MyPost'
import UserInfo from './UserInfo'
import MyHeader from '../Layout/MyHeader'
import MyFooter from '../Layout/MyFooter'
import { Layout, Menu, Breadcrumb } from 'antd';
const {  Content, Footer } = Layout;
class HomeRouter extends React.Component{

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
        return  <Layout>
  
          <MyHeader></MyHeader>
        <Content className="site-layout" >
          <div className="site-layout-background" style={{minHeight: 380,height:'620px'}}>
          <Switch>
          <Route   exact path='/' component={HomePage}></Route>
          <Route   path='/home/homepage/:id' component={HomePage}></Route>
          <Route   path='/home/mypost' component={MyPost}></Route>
          <Route   path='/home/userinfo'  component={UserInfo}></Route>
          </Switch>
          <MyFooter></MyFooter>
          </div>
        </Content>
      </Layout>
 


    }

}

    export default HomeRouter