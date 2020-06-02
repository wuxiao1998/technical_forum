import React from 'react'
import { Layout, Menu} from 'antd';
const { Footer} = Layout;
class MyFooter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
       
        }
    }

 
    render(){
        return <Footer style={{ textAlign: 'center',background:"#001529",color:"#ffffff"}}>
            上海杉达学院  ©2020 Created by Ant UED</Footer>
    }
}

export default MyFooter