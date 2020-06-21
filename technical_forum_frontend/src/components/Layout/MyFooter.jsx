import React from 'react'
import { Layout } from 'antd';
const { Footer } = Layout;
//主页底部布局组件
class MyFooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return <Footer style={{ textAlign: 'center', background: "#001529", color: "#ffffff" }}>
            上海杉达学院  ©2020 Created by 上海杉达学院</Footer>
    }
}

export default MyFooter