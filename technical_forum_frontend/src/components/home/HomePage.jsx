import React from 'react'
import Axios from 'axios'
import { Layout, Menu } from 'antd';
import { Card, Row, Col, Pagination } from 'antd';
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
      wholenoticedata: [],
      platenoticedata: [],
      pageNo: 1,
      pageSize: 3,
      plateid: sessionStorage.getItem("plateKey") ? sessionStorage.getItem("plateKey") : 1
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

    Axios.get('/notice/searchByUser?plateId= &pageNo=1&pageSize=3').then(res => {
      this.setState({
        wholenoticedata: res.data.content,
      })
      console.log(res, '全站公告')
    })
    //查询全站公告

    Axios.get('/notice/searchByUser?plateId=' + this.state.plateid + '&pageNo=1&pageSize=3').then(res => {
      //这里plateId拿值一定要这样绕一圈，直接拿sessionStorage.getItem("plateKey")的话第一次打开网页会报错
      this.setState({
        platenoticedata: res.data.content
      })
      console.log(res, '板块公告')
    })
    //查询板块公告
  }


  getKey = (item) => {
    this.setState({
      plateKey: item.key,
      plateid: sessionStorage.getItem("plateKey")
    })
    //点击板块时,保存一份platekey至sessionStorge中,解决页面刷新问题
    sessionStorage.setItem("plateKey", item.key)
    Axios.get('/notice/searchByUser?plateId=' + sessionStorage.getItem("plateKey") + '&pageNo=1&pageSize=3').then(res => {
      this.setState({
        platenoticedata: res.data.content
      })
      console.log(res, '板块公告')
    })
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
              <Link to={this.state.url + '/' + item.id} >
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
                  <div><PostList platekey={this.state.plateKey} ></PostList></div>
                </Col>
                <Col span={1}></Col>
                <Col span={7}>
                  <div style={{}}><Card title="全站公告" extra={<Link to='/wholenotice'>显示更多</Link>} style={{ width: 400 }} size="small">
                    {this.state.wholenoticedata.map((record) => {
                      return <Link to={{ pathname: '/noticedetail', state: { key: record.id, username: record.createUser.username, createtime: record.createtime, title: record.title, content: record.content, plateId: '全部' } }} >
                        {record.title}<br /></Link>
                    })}{/* 这里不能直接传record，格式不对，有些参数显示不了，需要进行改造*/}
                  </Card>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Card title="板块公告" extra={<Link to='/partnotice'>显示更多</Link>} style={{ width: 400 }} size="small">
                      {this.state.platenoticedata.map((record) => {
                        return <Link to={{ pathname: '/noticedetail', state: { key: record.id, username: record.createUser.username, 
                        createtime: record.createtime, title: record.title, content: record.content, plateId: record.plate.name } }} >
                          {record.title}<br /></Link>
                      })}
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