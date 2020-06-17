import React from 'react';
import Axios from 'axios';
import { List,Typography} from 'antd';
import { Link } from 'react-router-dom'

const { Text } = Typography;

//全站公告展示页
class WholeNotice extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

     componentWillMount(){
        // Axios.get('/notice/searchByUser?plateId=null'+'&pageNo=' + 1 + '&pageSize=' +
    // 6).then(res => {
    //   this.setState({
    //   })
    //   console.log(res,'123456789')
    // })
        
    }
    render(){
        return<List
        header={
          <div>
            <h2 style={{ display: "inline" }}>全站公告</h2>
          </div>
        }
        footer={1
        //   /*在底部自定义分页组件*/ 
        // <div style={{ textAlign: "center" }}><Pagination
        //   current={this.state.pageNo} pageSize={this.state.pageSize} total={this.state.totalPage}
        //   showSizeChanger={false} onChange={this.pageChange} />
        //   </div>
        }
        bordered
        dataSource={this.state.listData}
        renderItem={item => (
          /*渲染列表每一项,展示帖子信息*/
          <List.Item
            key={item.title}
            style={{ marginTop: "10px" }}
          >
            <List.Item.Meta
              title={<Link to={'/forumpost/detail/' + item.id} style={{ fontSize: '16px', fontWeight: 700 }}>{item.title}</Link>}
              description={<div><span style={{ display: 'inline-block', marginTop: '10px' }} className="product-buyer-name">
                {item.description}</span>
                <div style={{ marginTop: '10px' }}>
                  <Text type="secondary" className="product-buyer-name">
                    发布者:&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;发布时间:
                  </Text>
                </div>
              </div>
              }
            />
  
          </List.Item>
        )}
      />
            }
}

export default WholeNotice