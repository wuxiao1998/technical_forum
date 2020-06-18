import React from 'react';
import Axios from 'axios';
import { List, Typography, Descriptions, PageHeader } from 'antd';
import { Link } from 'react-router-dom'
import '../../../css/App.css'
const { Title } = Typography;
const { Text } = Typography;
//公告详情展示
class NoticeDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            record: this.props.location.state
        }
    }

    componentWillMount() {
console.log(this.state.record,'接收来的record')

    }
    render() {
        return <div style={{ margin: '20px' }}>
            {this.state.record && <div>
                <PageHeader
                    className="site-page-header"
                    title={this.state.record.title}
                    onBack={() => {
                        this.props.history.goBack();
                    }}


                />,

                <hr />
                <div>
                    <Text type="secondary" className="product-buyer-name">
                        {this.state.record.createtime}&nbsp;&nbsp;&nbsp;{this.state.record.username}&nbsp;&nbsp;&nbsp;
                    所属板块:{this.state.record.plateId}
                    </Text>
                </div>
                <hr />
                <div>
                    {this.state.record.content}
                </div>


            </div>
            }

        </div>
    }
}

export default NoticeDetail