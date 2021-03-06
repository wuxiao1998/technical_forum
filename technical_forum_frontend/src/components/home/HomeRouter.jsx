import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './HomePage'
import MyPost from './MyPost'
import UserInfo from './UserInfo'
import MyHeader from '../Layout/MyHeader'
import MyFooter from '../Layout/MyFooter'
import NoticeManagement from './management/NoticeManagement'
import NoticeDetail from './notice/NoticeDetail'
import UserManagement from './management/UserManagement'
import PersonData from '../authentication/PersonData'
import ApplyInfoManagement from './management/ApplyInfoManagement'
import { Layout } from 'antd';
//主页子路由配置
const { Content, Footer } = Layout;
class HomeRouter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      login: "登录",

    }
  }
  componentWillMount() {
    
  }


  render() {
    return <Layout>
      {/** 导入页面头部*/}
      <MyHeader></MyHeader>
      <Content className="site-layout" >
        <div className="site-layout-background" style={{ minHeight: 380, height: '620px' }}>
          <Switch>
            {/*这里配置主页的子路由信息,组件会被渲染中主页的中间部分,保留头部和底部*/}
            <Route exact path='/home/homepage/:id' component={HomePage}></Route>
            <Route exact path='/home/mypost' component={MyPost}></Route>
            <Route exact path='/home/userinfo' component={UserInfo}></Route>
            <Route exact path='/home/noticemanagement' component={NoticeManagement}></Route>       
            <Route exact path='/home/noticedetail' component={NoticeDetail}></Route>
            <Route exact path='/home/usermanagement' component={UserManagement}></Route>
            <Route exact path='/home/persondata' component={PersonData}></Route>
            <Route exact path='/home/applyinfomanagement' component={ApplyInfoManagement}></Route>
            {/* 重定向至主页,此匹配项最好放最后*/ }
            <Redirect from='/' to='/home/homepage/1'></Redirect>
          </Switch>
            {/** 导入页面底部*/}
          <MyFooter></MyFooter>
        </div>
      </Content>
    </Layout>



  }

}

export default HomeRouter