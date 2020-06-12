import React from 'react';
import axios from 'axios';
import { Form, Input, InputNumber, Button } from 'antd';
import NoLogin from '../../authentication/NoLogin'
//发新帖组件
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
class AddPost extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      plateId: this.props.match.params.id,
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
  onFinish = values => {
    console.log('Received values of form: ', values);
    axios.post('/forumPost/addPost', {
      title: values.title,
      description: values.title,
      count: 0,
      plateId: this.state.plateId,
      type: 1,
      user: {
        id: JSON.parse(sessionStorage.getItem("user")).id
      }
    }).then(res => {
      this.props.history.push('/home/homepage/' + this.state.plateId);
    })
  };
  goBack = () => {
    this.props.history.goBack();
  }
  render() {
    let element;
    if (this.state.loginin) {
      element = <div><h2 style={{ textAlign: 'center', marginBottom: '40px' }}>发布新帖</h2>
        <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请输入标题内容',
              },
              {
                max:15,
                message:'标题最多不超过15个字!!!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="详细描述"
          rules={[
            {
              required: true,
              message: '请输入标题内容',
            },
            {
              max:100,
              message:'详细描述最多不超过100字!!!'
            }
          ]}
          >
            <Input.TextArea style={{height:'150px'}}/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
            <Button type="primary" htmlType="submit">
              发布
              </Button>
            <Button type="default" style={{ marginLeft: '40px' }} onClick={this.goBack}>
              返回
              </Button>
          </Form.Item>
        </Form>
      </div>
    } else {
      element = <div>
        <NoLogin history={this.props.history}></NoLogin>
      </div>
    }
    return <div style={{ textAlign: 'center', marginTop: '10%' }}>
      {element}
    </div>
  }
}

export default AddPost