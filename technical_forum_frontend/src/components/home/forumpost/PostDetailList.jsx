import React from 'react';
import {
  PageHeader, List, Typography, Comment, Pagination, Form, Button, Input,Modal,message,BackTop,Popconfirm
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

//回复评论组件
const Reply = ({ onChange, value }) => (
  <>
    <Form.Item style={{ marginLeft: '80px' }}>
      <TextArea rows={4} onChange={onChange} value={value} />
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
      visible: false ,//用于控制弹窗的显示‘
      replyId:'',//取每一条帖子详情的id
      replyValue:'',//回复内容
      userId: sessionStorage.getItem("user")? JSON.parse(sessionStorage.getItem("user")).id:null //当前登录用户的id

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
      //操作成功后重新查询一次页面,并清空文本域原来的值
      this.setState({
        value:''
      })
      message.success("发表成功,经验值+5")
      this.loadingData();
    })
  }
  //点击参与回复,显示弹窗,发表回复
  showReply = (replyId) => {
    console.log(replyId)
    this.setState({
      visible: true,
      replyId:replyId
    });
  }
 //点击回复发表评论
  handleOk = e => {
    Axios.post('/forumPost/reply',{
      forumPostDetailId:this.state.replyId,
      content:this.state.replyValue
     }).then(res=>{
      //操作成功后隐藏modal,并清空文本域原来的值
      this.setState({
        visible: false,
        replyValue:''
      })
      message.success("评论成功,经验值+3")
       //操作成功后重新查询一次页面
       this.loadingData();
     })
  }; 

  //取消按钮关闭弹窗
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      replyValue:''
    });
  }
    
  deletePost = ()=>{
    Axios.delete('/forumPost/deletePostById?postId='+this.state.postId).then(res=>{
      message.success('删除成功!!!')
      this.props.history.goBack();
    })
  }

  //与用户回帖的文本域绑定
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  //与用户评论的文本域绑定
  handleChangeReply = e => {
    this.setState({
      replyValue: e.target.value,
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
            {sessionStorage.getItem('user')&&(JSON.parse(sessionStorage.getItem('user')).role =='管理员'||
            this.state.userId == this.state.mainUser.id)&&
            <Popconfirm title="确定要删除此帖吗？(删除后不可恢复)" okText="Yes" cancelText="No" onConfirm={this.deletePost}>
             <Button style={{float:'right'}}>删除帖子</Button>
             </Popconfirm>}
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
                {this.state.userId&&<span>
                <Button  >举报</Button>&nbsp;&nbsp;&nbsp;
                <Button onClick={this.showReply.bind(this, item.id)}>参与回复</Button>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>}
                发帖时间:{item.createtime}
              </div>

            </div>
          </div>
        </List.Item>
        }
      />
      <Modal
          title="输入回复内容"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="回复"
          cancelText="取消"
          maskClosable={false}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <img
              width={60}
              height={60}
              src={"http://localhost:8000/forum/image/" + this.state.userId + ".jpg"}
            />
            <Reply
              onChange={this.handleChangeReply}
              value={this.state.replyValue}
            />
        </Modal>
        <BackTop />
    </div>
  }
}
export default PostDetailList