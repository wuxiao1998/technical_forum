import React from 'react';
import { Result, Button } from 'antd';
import NoLogin from '../authentication/NoLogin'
//我的帖子组件
class MyPost extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loginin: true
        }
    }

    componentWillMount() {
        if (!sessionStorage.getItem("user")) {

            this.setState({
                loginin: false
            })
        }
    }

    goLogin = () => {
        this.props.history.push('/');
    }

    render() {
        let element;
        if (this.state.loginin) {
            element = <div>我的帖子</div>
        } else {
            element = <NoLogin history={this.props.history}></NoLogin>
        }
        return <div style={{ minHeight: '80vh', marginTop: "5%" }}>
            {element}
        </div>
    }
}

export default MyPost