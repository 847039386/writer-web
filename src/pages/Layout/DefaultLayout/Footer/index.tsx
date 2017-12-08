import * as React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class FooterComponent extends React.Component<any,any> {
  render() {
    return (
      <Footer className="theme_CFooter">
        Ant Design ©2016 Created by Ant UED
      </Footer>
    );
  }
}

export default FooterComponent;
