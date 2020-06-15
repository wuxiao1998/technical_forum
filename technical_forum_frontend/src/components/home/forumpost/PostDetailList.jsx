import React from 'react';
import { PageHeader,Descriptions, List, Typography,Comment,Tooltip,Avatar} from 'antd';
import { QuestionCircleFilled} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import PostDetailItem from './PostDetailItem'
import Axios from 'axios';
const { Paragraph } = Typography;
const { Title } = Typography;
const { Text } = Typography;
class PostDetailList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          postId:this.props.match.params.postid,
          forumPost:{},
          mainUser:{}
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
      render(){
          return <div><PageHeader
          className="site-page-header"
          onBack={() => null}
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
      footer={<div>Footer</div>}
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