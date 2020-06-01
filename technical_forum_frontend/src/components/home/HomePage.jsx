import React from 'react'
import Axios from 'axios'
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            plateList:[],
         
        }
    }

    componentWillMount(){
      Axios.get('/plate/findAll').then(res=>{
            console.log(res);
            this.setState({
                plateList:res.data
            })
        })
        
       
    }

    getKey = (item)=>{
      console.log(item.key)
    }


    render(){
        
        return   <Layout style={{ minHeight: '82vh' ,marginTop:"63px"}}>
        <Sider 
        width="194"
       >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={this.getKey}>
            {this.state.plateList.map(item=>{
                return <Menu.Item key={item.id} >
              {item.name}
              </Menu.Item>
            })}
            
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{
               padding: 24,
                minHeight: 360,
               
               }}>
              Bill is a cat.<br/>
              Bill is a cat.<br/>
              
            </div>
          </Content>

        </Layout>
      </Layout>
     
    }
}

export default HomePage