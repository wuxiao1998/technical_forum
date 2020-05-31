import React from 'react';
import { Result, Button } from 'antd';
class NoLogin extends React.Component{

    constructor(props){
        super(props)
        this.state = {
           
        }
    }
    
    goLogin=()=>{
        this.props.history.push('/login');
    }

    render(){
        return <Result
        title="抱歉,您还未登录,无法使用该功能!!!"
        style={{marginTop:"10%"}}
        extra={[
          <Button type="primary" key="console" onClick={this.goLogin}>
           立即登录
          </Button>
        ]}
      />
    }
}

 export default NoLogin