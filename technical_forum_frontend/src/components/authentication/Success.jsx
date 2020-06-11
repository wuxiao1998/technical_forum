import React from 'react';
import { Result, Button } from 'antd';
//注册功能提示组件
class Success extends React.Component {

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
      title="注册成功!"
      style={{ marginTop: "10%" }}
      subTitle="欢迎加入技术论坛,赶紧去登录发贴吧~"
      extra={[
        <Button type="primary" key="console" onClick={this.goLogin}>
          立即登录
          </Button>
      ]}
    />
  }
}

export default Success