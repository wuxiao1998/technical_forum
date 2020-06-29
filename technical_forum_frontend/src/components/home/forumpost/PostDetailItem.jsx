import React from 'react';
import { Comment, Avatar, Badge,Divider,message } from 'antd';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import '../../../css/App.css'
class PostDetailItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

errorAlert(){
  message.error("游客无法下载附件")
}

  componentWillMount() {



  }

  // //下载文件
  // downloadfile = () => {
  //   console.log(this.state.value)
  //   Axios.get('forumPost/download?fileName='+this.props.fileName, {

  //   }).then(res => {
  //   })
  // }
  render() {
    console.log(this.props.fileName,'787879999999999999999')
    return <div style={{ marginTop: 20 }}>
      <div style={{ float: 'left', width: '100px', height: 270, textAlign: 'center' }}>
        <Badge count={this.props.type ? this.props.type : ''}>
          <img src={'http://localhost:8000/forum/image/' + this.props.id + ".jpg"} width={60} height={60} />
        </Badge><br /><br />昵称：<Link to={{
                    pathname: '/home/persondata', state: {
                      userid: this.props.id,
                      gender: this.props.gender,
                      nickname: this.props.nickname,
                      role: this.props.role,
                      experience: this.props.experience,
                      level: this.props.level,
                      designation: this.props.designation
                    }
                  }} >{this.props.nickname}<br /><br />
                  </Link>
        {/* <span>昵称:{this.props.username}</span><br /><br /> */}
        <span>等级:{this.props.level}</span><br /><br />
        <span>称号:{this.props.designation}</span><br /><br />
      </div>
      <div style={{ float: 'right', width: '80%', height: 270, textAlign: 'left' }}>
        <div>{this.props.description}</div>
        {(this.props.type=='楼主'&&this.props.fileName)&&
            <div>
        <Divider orientation="left" className="hr" style={{}}>附件下载</Divider>
        <span style={{}}>
                {JSON.parse(sessionStorage.getItem('user'))?<a href={'http://localhost:8000/forum/forumPost/download/'+this.props.fileName}>{this.props.fileName.split(this.props.fileName.substring(this.props.fileName.lastIndexOf('-'),this.props.fileName.length))}{this.props.fileName.substring(this.props.fileName.lastIndexOf('.'),this.props.fileName.length)}</a>:<a onClick={this.errorAlert}>{this.props.fileName.split(this.props.fileName.substring(this.props.fileName.lastIndexOf('-'),this.props.fileName.length))}{this.props.fileName.substring(this.props.fileName.lastIndexOf('.'),this.props.fileName.length)}</a>}
            </span>
            </div>
        }
      </div>
    </div>
  }
}
export default PostDetailItem