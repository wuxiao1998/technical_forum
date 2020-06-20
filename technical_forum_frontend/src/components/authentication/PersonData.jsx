import React from 'react';
import { Result, Button, Badge } from 'antd';
import { Tabs, Descriptions, Avatar } from 'antd';
import NoLogin from '../authentication/NoLogin';
import MyPostList from '../home/forumpost/MyPostList';
import Axios from 'axios';
const { TabPane } = Tabs;
//我的帖子组件
class PersonData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: JSON.parse(sessionStorage.getItem("user")),
            loginin: true,
            record: this.props.location.state,
            titilename: (this.props.location.state.gender) == '男' ? '他的帖子' : '她的帖子',
            nickname: "",
            phone: "",
            gender: "",
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            uploadfile: '',
            imageUrl: "http://localhost:8000/forum/image/",
            fileobj: '',
            userinfo: {},
        }
    }


    componentWillMount() {
        console.log(this.props.location, '7777777777777777777777777777')
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
        console.log(this.state.user, '987')
        if (this.state.loginin) {
            element = <div  >
                <Tabs defaultActiveKey="1" style={{ backgroundColor: "#F0F2F5", marginTop: '20px' }} type="line" size={"large"}>
                    <TabPane
                        tab={

                            <span>
                                &nbsp;&nbsp;{this.state.titilename}
                            </span>
                        }
                        key="1"
                    >
                        <MyPostList userid={this.props.location.state.userid}></MyPostList>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                个人资料
                            </span>
                        }
                        key="2"
                    >
                        <Descriptions bordered style={{ backgroundColor: "white" }}>
                            <Descriptions.Item label="昵称" span={3}>{this.props.location.state.nickname} </Descriptions.Item>
                            <Descriptions.Item label="头像" span={3}>
                                <Avatar shape="square" size={64}
                                    src={"http://localhost:8000/forum/image/" + this.props.location.state.userid + ".jpg"} />
                            </Descriptions.Item >
                            <Descriptions.Item label="性别" span={3}>{this.props.location.state.gender}</Descriptions.Item>
                            <Descriptions.Item label="身份" span={3}>{this.props.location.state.role}</Descriptions.Item>
                            <Descriptions.Item label="经验">{this.props.location.state.experience}</Descriptions.Item>
                            <Descriptions.Item label="等级">{this.props.location.state.level}</Descriptions.Item>
                            <Descriptions.Item label="称号">{this.props.location.state.designation}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                </Tabs>
            </div >
        } else {
            element = <NoLogin history={this.props.history}></NoLogin>
        }
        return <div style={{ minHeight: '80vh', marginTop: "4%", marginLeft: "3%", marginRight: "3%", marginBottom: "3%", }}>
            {element}
        </div>
    }
}

export default PersonData