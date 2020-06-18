import React from 'react'
import Axios from 'axios'
import { Layout, Menu} from 'antd';
import { Card,Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import PostList from './forumpost/PostList'
import SizeContext from 'antd/lib/config-provider/SizeContext';
//主页组件
const { Header, Content, Footer, Sider } = Layout;
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plateList: [],
      plateKey: '',
      url: '/home/homepage',
    }
  }

  componentWillMount() {
    //组件加载时,根据版本id查询对应的帖子信息,如session中没有,说明是第一次访问,默认选中第一项,将第一个板块的板块id存入session
    Axios.get('/plate/findAll').then(res => {
      this.setState({
        plateList: res.data,
        plateKey: sessionStorage.getItem("plateKey") ? sessionStorage.getItem("plateKey") : res.data[0].id.toString(),
      })
      //将版本id存入sessionStorge中,有利于之后的页面切换,避免参数丢失的问题
      if (!sessionStorage.getItem("plateKey")) {
        sessionStorage.setItem("plateKey", res.data[0].id.toString());
      }
    })

    // Axios.get('/notice/searchByUser?plateId=null'+'&pageNo=' + 1 + '&pageSize=' +
    // 6).then(res => {
    //   this.setState({
    //   })
    //   console.log(res,'123456789')
    // })
    //查询全站公告，暂时还没数据
  }

  getKey = (item) => {
    this.setState({
      plateKey: item.key
    })
    //点击板块时,保存一份platekey至sessionStorge中,解决页面刷新问题
    sessionStorage.setItem("plateKey", item.key)
  }


  render() {

    return <Layout style={{ minHeight: '82vh', marginTop: "63px" }}>
      <Sider
        width="194"
      >
        {/*动态渲染左侧菜单栏,通过切割url地址栏最后的数字参数来选中对应的菜单选项*/}
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
            <div style={{ display: "inline" }}>
              <Row>
              {/* 用于布局，一行总数为24 */}
                <Col span={16}>
              <div style={{}}><PostList platekey={this.state.plateKey} ></PostList></div>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
              <div style={{}}><Card title="全站公告" extra={<a href="#">显示更多</a>} style={{ width: 400 }} size="small">
                <p>公告1balabalblablaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                <p>公告2balabalblabla</p>
                <p>公告3balabalblabla</p>
              </Card>
                <br></br>
                <br></br>
                <br></br>
                <Card title="热门帖子（暂定）" extra={<a href="#">显示更多</a>} style={{ width: 400 }} size="small">
                  <p>帖子1balabalblabla</p>
                  <p>帖子2balabalblabla</p>
                  <p>帖子3balabalblabla</p>
                </Card>
              </div>
              </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>

    </Layout>

  }
}

export default HomePage