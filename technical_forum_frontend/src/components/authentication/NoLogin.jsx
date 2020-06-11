import React from 'react';
import { Result, Button } from 'antd';
//未登录,显示此组件
class NoLogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  goLogin = () => {
    this.props.history.push('/login');
  }

  render() {
    return <Result
      title="抱歉,您还未登录,无法使用该功能!!!"
      style={{ marginTop: "5%", minHeight: '80vh' }}
      extra={[
        <div>
          <Button type="primary" key="login" onClick={this.goLogin}>
            立即登录
          </Button>
        </div>
      ]}
    />
  }
}

export default NoLogin