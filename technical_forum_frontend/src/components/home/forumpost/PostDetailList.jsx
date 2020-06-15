import React from 'react';
import {
   PageHeader,Descriptions, List, Typography,Comment,Tooltip,Avatar,Pagination,Form,Button,Input 
} from 'antd';
import { QuestionCircleFilled} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import PostDetailItem from './PostDetailItem'
import Axios from 'axios';
const { Paragraph } = Typography;
const { Title } = Typography;
const { TextArea } = Input;
const { Text } = Typography;
const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item style={{marginLeft:'80px'}}>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item style={{marginLeft:'80px'}}>
      <Button htmlType="submit"  onClick={onSubmit} type="primary">
        发表
      </Button>
    </Form.Item>
  </>
);
class PostDetailList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          postId:this.props.match.params.postid,
          forumPost:{},
          mainUser:{},
          pageNo: 1,
          pageSize: 6,
          totalPage: 10,
          value:''
        }
      }

    componentWillMount(){
      Axios.get('/forumPost/findPostDetails?postId='+this.state.postId)
      .then(res=>{
        console.log(res)
        this.setState({
          forumPost:res.data,
          mainUser:res.data.user
        })
      })
    }

    handleSubmit = (e) => {
      console.log(e)
    }
    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };
    pageChange = (page) => {
      console.log(page)
    }
      render(){
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
      <div style={{height:300,position:'relative'}}>
        <Title style={{display:'inline',marginLeft:'15px'}}><QuestionCircleFilled/>&nbsp;{this.state.forumPost.title}</Title>
       <PostDetailItem {...this.state.mainUser} description={this.state.forumPost.description} postTime={this.state.forumPost.createtime}>
       </PostDetailItem>
      </div>
      }
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
        total: this.state.totalPage,
      }}
      footer={<div>
        {sessionStorage.getItem("user")?<div>
          <img
              width={60} 
              height={60}
              src={"http://localhost:8000/forum/image/"+JSON.parse(sessionStorage.getItem("user")).id+".jpg"}
              alt="Han Solo"
            />
         <Editor
             onSubmit={this.handleSubmit}
             onChange={this.handleChange}
             value={this.state.value}
            />
            </div>
            :<div style={{textAlign:'center'}}><Link to="/login?type=comment">登录后即可参与评论</Link></div>
            }
 
      </div>}
      bordered
      dataSource={this.state.forumPost.forumPostDetails}
      renderItem={item => <List.Item> <div style={{minHeight:300,position:'relative'}}>
        <PostDetailItem {...item.user} description={item.content} postTime={item.createtime}>
       </PostDetailItem>
    </div></List.Item>}
    />
        </div>
      }
}
export default PostDetailList