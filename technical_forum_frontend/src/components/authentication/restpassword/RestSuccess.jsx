import React from 'react';
import { Result, Button } from 'antd';
//注册功能提示组件
class RestSuccess extends React.Component {

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
      status="success"
      title="密码重置成功!"
      style={{ marginTop: "10%" }}
      extra={[
        <Button type="primary" key="console" onClick={this.goLogin}>
          立即登录
          </Button>
      ]}
    />
  }
}

export default RestSuccess