import React from 'react';
import { Comment, Avatar, Badge } from 'antd';
class PostDetailItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {



  }
  render() {
    return <div style={{ marginTop: 20 }}>
      <div style={{ float: 'left', width: '100px', height: 270, textAlign: 'center' }}>
        <Badge count={this.props.type ? this.props.type : ''}>
          <img src={'http://localhost:8000/forum/image/' + this.props.id + ".jpg"} width={60} height={60} />
        </Badge><br /><br />
        <span>昵称:{this.props.username}</span><br /><br />
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