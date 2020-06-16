import React from 'react';
import {
  PageHeader, List, Typography, Comment, Pagination, Form, Button, Input
} from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import PostDetailItem from './PostDetailItem'
import Axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;
//回帖组件
const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item style={{ marginLeft: '80px' }}>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item style={{ marginLeft: '80px' }}>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        发表
      </Button>
    </Form.Item>
  </>
);

class PostDetailList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postId: this.props.match.params.postid,//接收url参数
      forumPost: {},//接收帖子楼主信息
      mainUser: {},//接收帖子楼主的用户信息
      forumPostDetail: [],//接收帖子详情信息
      pageNo: 1,//当前页码
      pageSize: 6,//每页显示多少
      totalPage: 0,//总共多少
      value: '',//绑定用户回帖信息
      replyInfo: [],//每条帖子对应的评论信息

    }
  }

  async componentWillMount() {
    //先同步查询楼主信息
    await Axios.get('/forumPost/findById?postId=' + this.state.postId).then(res => {
      this.setState({
        forumPost: res.data,
        mainUser: res.data.user
      })
    })
    //查询页面所有帖子以及评论信息
    this.loadingData();
  }

  loadingData = () => {
    //分页查询帖子的所有详细信息
    Axios.get('/forumPost/findPostDetails?postId=' + this.state.postId + '&pageNo=' 
    + this.state.pageNo + '&pageSize=' + this.state.pageSize)
      .then(res => {
        //查询成功为state里对应变量进行赋值
        this.setState({
          forumPostDetail: res.data.content,
          totalPage: res.data.totalElements,
        })
      })
  }

  //保存回帖内容
  handleSubmit = () => {
    console.log(this.state.value)
    Axios.post('forumPost/comment', {
      forumPostId: this.state.postId,
      content: this.state.value
    }).then(res => {
      //操作成功后重新查询一次页面
      this.loadingData();
    })
  }
  //点击参与回复,发表回复
  showReply = (replyId) => {
    console.log(replyId)
    this.setState({
      reply: true
    })

  }
  //与用户回帖的文本域绑定
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  //分页监听函数，点击分页控件会触发,page参数为单击后的页码
  pageChange = (page) => {
    Axios.get('/forumPost/findPostDetails?postId=' + this.state.postId + '&pageNo=' + page + '&pageSize=' + this.state.pageSize
    ).then(res => {
      console.log(res.data)
      this.setState({
        //查询成功后重新为state的变量赋值
        forumPostDetail: res.data.content,
        totalPage: res.data.totalElements,
        pageNo: page
      })
    })

  }
  render() {
    return <div><PageHeader
      className="site-page-header"
      onBack={() => {
        this.props.history.goBack();
      }}
      title="帖子详情"
    >
    </PageHeader>
      <List
        size="large"
        header={
          <div style={{ height: 300, position: 'relative' }}>
            <Title style={{ display: 'inline', marginLeft: '15px' }}><QuestionCircleFilled />&nbsp;{this.state.forumPost.title}</Title>
            <PostDetailItem {...this.state.mainUser} description={this.state.forumPost.description} type="楼主">
            </PostDetailItem>
            <span style={{ position: 'absolute', bottom: 0, right: 0 }}>
              发帖时间:{this.state.forumPost.createtime}
            </span>

          </div>
        }
        footer={<div>
          {/*权限判断,如果没有登录，不显示提交回帖的文本域*/}
          {sessionStorage.getItem("user") ? <div>
            <img
              width={60}
              height={60}
              src={"http://localhost:8000/forum/image/" + JSON.parse(sessionStorage.getItem("user")).id + ".jpg"}
            />
            <Editor
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              value={this.state.value}
            />
          </div>
            : <div style={{ textAlign: 'center' }}><Link to="/login?type=comment">登录后即可参与评论</Link></div>
          }
           {/*自定义分页插件*/}
          <div style={{ textAlign: "center" }}>
            <Pagination
            current={this.state.pageNo} pageSize={this.state.pageSize} total={this.state.totalPage}
            showSizeChanger={false} onChange={this.pageChange} />
            </div>
        </div>}
        bordered
        dataSource={this.state.forumPostDetail}
        renderItem={item =>
           /*渲染列表的每一项*/
           <List.Item
          key={item.id}
        > <div style={{ minHeight: 600, position: 'relative' }}>
            <PostDetailItem {...item.user} description={item.content}>
            </PostDetailItem>
            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <div style={{ width: '1170px' }}>
                {/*如果该条记录有评论列表,就显示在嵌套的list中*/}
                {item.forumPostReply.length != 0 &&
                  <List
                    size="small"
                    pagination={{
                      pageSize: 3
                    }
                    }
                    dataSource={item.forumPostReply}
                    renderItem={value => <List.Item >
                      <Comment
                        key={value.id}
                        author={value.user.nickname}
                        avatar={'http://localhost:8000/forum/image/' + value.user.id + '.jpg'}
                        content={value.content}
                        datetime={value.createtime}
                      />
                    </List.Item>
                    }
                  >
                  </List>
                }
              </div>
              {/*每一项item的底部,使用子绝父相布局使其永远固定在底部位置*/}
              <div style={{ textAlign: 'right' }}>
                <Button  >举报</Button>&nbsp;&nbsp;&nbsp;
                <Button onClick={this.showReply.bind(this, item.id)}>参与回复</Button>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;发帖时间:{item.createtime}
              </div>

            </div>
          </div>
        </List.Item>
        }
      />
    </div>
  }
}
export default PostDetailList