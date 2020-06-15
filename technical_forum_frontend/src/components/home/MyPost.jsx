import React from 'react';
import { Result, Button } from 'antd';
import { Tabs } from 'antd';
import NoLogin from '../authentication/NoLogin';
import MyPostList from'./forumpost/MyPostList';
const { TabPane } = Tabs;
//我的帖子组件
class MyPost extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: JSON.parse(sessionStorage.getItem("user")),
            loginin: true
        }
    }


    componentWillMount() {
        document.body.style.backgroundColor = '#F0F2F5';//将整个页面背景色改为灰色，解决有背景没被渲染出现白色；（副作用容易造成重绘影响性能，暂未发现影响）
        if (!sessionStorage.getItem("user")) {

            this.setState({
                loginin: false
            })
        }
    }

    goLogin = () => {
        this.props.history.push('/');
    }

    render() {
        let element;
        console.log(this.state.user,'987')
        if (this.state.loginin) {            
            element = <div>
                <Tabs defaultActiveKey="1" style={{backgroundColor:"#F0F2F5"}} type="line" size={"large"}>
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
        <span>
          我的消息
        </span>
      }
      key="2"
    >我的消息
    </TabPane>
  </Tabs>
                </div >
        } else {
            element = <NoLogin history={this.props.history}></NoLogin>
        }
        return <div style={{ minHeight: '80vh', marginTop: "3%", marginLeft: "3%" , marginRight: "3%", marginBottom: "3%",}}>
            {element}
        </div>
    }
}

export default MyPost