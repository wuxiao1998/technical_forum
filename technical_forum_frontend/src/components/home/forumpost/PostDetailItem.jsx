import React from 'react';
import { Comment, Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom'
class PostDetailItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
console.log(this.props,'12222222222222222222')


  }
  render() {
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
      </div>
    </div>
  }
}
export default PostDetailItem