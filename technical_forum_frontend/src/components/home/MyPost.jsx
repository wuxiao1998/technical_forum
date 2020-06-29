import React from 'react';
import { Result, Button, Badge } from 'antd';
import { Tabs } from 'antd';
import NoLogin from '../authentication/NoLogin';
import MyPostList from'./forumpost/MyPostList';
import MyInfo from './MyInfo'
import Axios from 'axios';
const { TabPane } = Tabs;
//我的帖子组件
class MyPost extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: JSON.parse(sessionStorage.getItem("user")),
            loginin: true,
            unreadCount:0
        }
    }


    componentWillMount() {
        if (!sessionStorage.getItem("user")) {

            this.setState({
                loginin: false
            })
        }
        Axios.get('/information/unreadInformationQuantity').then(res=>{
          console.log(res)
          this.setState({
            unreadCount:res.data
          })
        })
    }

    goLogin = () => {
        this.props.history.push('/');
    }

    updateCount = (result,count)=>{
        this.setState({
          unreadCount:count
        })

    }
    render() {
        let element;
        if (this.state.loginin) {            
            element = <div  >
                <Tabs defaultActiveKey="1" style={{backgroundColor:"#F0F2F5",marginTop:'20px'}} type="line" size={"large"}>
    <TabPane
      tab={
        <span>
          &nbsp;&nbsp;我的帖子
        </span>
      }
      key="1"
    >
      <MyPostList ></MyPostList>
    </TabPane>
    <TabPane
      tab={
        <Badge count={this.state.unreadCount} offset={[10, -9]}>
        <span>
          我的消息
        </span>
        </Badge>
      }
      key="2"
    >
      <MyInfo history={this.props.history} parent={this.updateCount} count={this.state.unreadCount}></MyInfo>
    </TabPane>
  </Tabs>
                </div >
        } else {
            element = <NoLogin history={this.props.history}></NoLogin>
        }
        return <div style={{ minHeight: '80vh', marginTop: "4%", marginLeft: "3%" , marginRight: "3%", marginBottom: "3%",}}>
            {element}
        </div>
    }
}

export default MyPost