import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import './css/App.css'
import LoginForm from './components/authentication/LoginForm'
import Register from './components/authentication/Register'
import Success from './components/authentication/Success'
import HomeRouter from './components/home/HomeRouter'
import AddPost from './components/home/forumpost/AddPost'
import OldPwCheck from './components/authentication/OldPwCheck'
import NewPwUpdate from './components/authentication/NewPwUpdate'
import PostDetailList from './components/home/forumpost/PostDetailList'
import NoticeDetail from './components/home/notice/NoticeDetail'
import WholeNotice from './components/home/notice/WholeNotice'
import PartNotice from './components/home/notice//PartNotice'
import ForgetPassword from './components/authentication/restpassword/ForgetPassword'
import EmailCheck from './components/authentication/restpassword/EmailCheck'
import RestPassword from './components/authentication/restpassword/RestPassword'
import RestSuccess from './components/authentication/restpassword/RestSuccess'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      login: "登录",

    }
  }
  componentWillMount() {
    console.log("wddw")
  }


  render() {
    return <HashRouter>
      {/*配置主路由 */}
      <Switch>
        <Route exact path='/login' component={LoginForm}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/success' component={Success}></Route>
        <Route exact path='/' component={HomeRouter}></Route>
        <Route path='/home' component={HomeRouter}></Route>
        <Route path='/forumpost/add/:plateid' component={AddPost}></Route>
        <Route path='/oldpwcheck' component={OldPwCheck}></Route>
        <Route path='/newpwupdate' component={NewPwUpdate}></Route>
        <Route path='/forumpost/detail/:postid' component={PostDetailList}></Route>
        <Route exact path='/noticedetail' component={NoticeDetail}></Route>
        <Route exact path='/wholenotice' component={WholeNotice}></Route>
        <Route exact path='/partnotice' component={PartNotice}></Route>
        <Route exact path='/forgetpassword' component={ForgetPassword}></Route>
        <Route exact path='/emailcheck' component={EmailCheck}></Route>
        <Route exact path='/restpassword' component={RestPassword}></Route>
        <Route exact path='/restsuccess' component={RestSuccess}></Route>
      </Switch>
    </HashRouter>

  }

}

export default App