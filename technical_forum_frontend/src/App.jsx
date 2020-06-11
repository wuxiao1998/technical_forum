import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import './css/App.css'
import LoginForm from './components/authentication/LoginForm'
import Register from './components/authentication/Register'
import Success from './components/authentication/Success'
import EmailCheck from './components/authentication/EmailCheck'
import HomeRouter from './components/home/HomeRouter'
import AddPost from './components/home/forumpost/AddPost'
import OldPwCheck from './components/authentication/OldPwCheck'
import NewPwUpdate from './components/authentication/NewPwUpdate'
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
        <Route exact path='/emailcheck' component={EmailCheck}></Route>
        <Route exact path='/' component={HomeRouter}></Route>
        <Route path='/home' component={HomeRouter}></Route>
        <Route path='/forumpost/add/:id' component={AddPost}></Route>
        <Route path='/oldpwcheck' component={OldPwCheck}></Route>
        <Route path='/newpwupdate' component={NewPwUpdate}></Route>
      </Switch>
    </HashRouter>

  }

}

export default App