import './index.css';
import * as React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;


class ContentComponent extends React.Component<any,any> {
  render() {
    return (
      <Content className="main_layout">
        {this.props.children}
      </Content>
    );
  }
}

export default ContentComponent;
