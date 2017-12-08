import './index.css';
import * as React from 'react';
import Menu from './Menu';
import { Layout } from 'antd';
const { Header } = Layout;

class HeaderComponent extends React.Component<any,any> {
  render() {
    return (
      <Header>
        <div className="logoDefault" />
        <Menu />
      </Header>
    );
  }
}

export default HeaderComponent;
