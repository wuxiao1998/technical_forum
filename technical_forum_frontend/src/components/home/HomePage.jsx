import React from 'react'
import Axios from 'axios'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import PostList from './forumpost/PostList'
//主页组件
const { Header, Content, Footer, Sider } = Layout;
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plateList: [],
      plateKey: '',
      url: '/home/homepage'
    }
  }

  componentWillMount() {
    Axios.get('/plate/findAll').then(res => {
      this.setState({
        plateList: res.data,
        plateKey: sessionStorage.getItem("plateKey") ? sessionStorage.getItem("plateKey") : res.data[0].id.toString(),
      })
      if (!sessionStorage.getItem("plateKey")) {
        sessionStorage.setItem("plateKey", res.data[0].id.toString());
      }
    })



  }

  getKey = (item) => {
    this.setState({
      plateKey: item.key
    })
    //保存platekey至sessionStorge中,解决页面刷新问题
    sessionStorage.setItem("plateKey", item.key)
  }


  render() {

    return <Layout style={{ minHeight: '82vh', marginTop: "63px" }}>
      <Sider
        width="194"
      >
        <Menu theme="dark" selectedKeys={[window.location.hash.split('/')[3]]} mode="inline" onSelect={this.getKey}>
          {this.state.plateList.map(item => {
            return <Menu.Item key={item.id} >
              <Link to={this.state.url + '/' + item.id}>
                {item.name}</Link>
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
            {/*板块id传入子组件*/}
            <PostList platekey={this.state.plateKey}></PostList>
          </div>
        </Content>
      </Layout>
    </Layout>

  }
}

export default HomePage