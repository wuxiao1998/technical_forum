import React from 'react';
import { Link } from 'react-router-dom'
class PostDetailItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
      }

    componentWillMount(){
     


    }
      render(){
          return  <div style={{marginTop:20}}>
          <div style={{float:'left',width:'100px',height:270,textAlign:'center'}}>
            <img src={'http://localhost:8000/forum/image/'+this.props.id+".jpg"} width={60}/><br/><br/>
           <span>昵称:{this.props.username}</span><br/><br/>
           <span>等级:{this.props.level}</span><br/><br/>
           <span>称号:{this.props.designation}</span><br/><br/>
          </div>
          <div style={{float:'right',width:'80%',height:270,textAlign:'left'}}>
          <div>{this.props.description}</div>
          <span style={{position:'absolute',bottom:0,right:0}}>
          <Link to="#">举报</Link>&nbsp;&nbsp;&nbsp;<Link to="#">回复</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;发帖时间:{this.props.postTime}
            </span>
            </div>
        </div>
      }
}
export default PostDetailItem