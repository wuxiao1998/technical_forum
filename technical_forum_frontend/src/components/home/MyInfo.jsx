import React from 'react';
import { Result, Button } from 'antd';
class MyInfo extends React.Component{

    constructor(props){
        super(props)
        this.state = {
           
        }
    }
    
    componentWillMount(){
        if(!sessionStorage.getItem("user")){
            this.props.history.push('/nologin');
        }
    }
    
    goLogin=()=>{
        this.props.history.push('/');
    }

    render(){
        return <div>我的信息</div>
    }
}

 export default MyInfo