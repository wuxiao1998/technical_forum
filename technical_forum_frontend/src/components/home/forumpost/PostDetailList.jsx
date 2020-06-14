import React from 'react';
import { PageHeader } from 'antd';
import Axios from 'axios';
class PostDetailList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
      }

      render(){
          return <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Title"
          subTitle="This is a subtitle"
        />
      }
}
export default PostDetailList