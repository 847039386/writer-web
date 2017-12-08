import * as React from 'react';
import { Menu } from 'antd';


class MenuComponent extends React.Component<any ,any> {
  constructor(props :any){
    super(props)
    this.toLink = this.toLink.bind(this)
    this.state = {
      default_key : '1'
    }
  }

  toLink(e :any){
    switch(e.key){
      case '1':
        this.setState({default_key :e.key})
        location.replace("#/");
      break;
      case '2':
        this.setState({default_key :e.key})
        location.replace("#/dramas");
      break;
      case '3':
        this.setState({default_key :e.key})
        location.replace("#/topics");
      break;
    }
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[this.state.default_key]}
        style={{ lineHeight: '64px' }}
        onClick={this.toLink}
      >
        <Menu.Item key="1">首页</Menu.Item>
        <Menu.Item key="2">剧本</Menu.Item>
        <Menu.Item key="3">文章</Menu.Item>
      </Menu>
    );
  }
}

export default MenuComponent;
// this.props.dispatch({ type : 'theme_dark'})