import * as React from 'react';
import { Layout , Menu ,Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
import Body from './Body';
import './index.less';
const logo = require('../../../public/img/logo.svg');
import { Link } from 'react-router-dom'
class UserAdministrationLayout extends React.Component<any,any> {

    constructor(props:any){
        super(props)
        this.toLink = this.toLink.bind(this)
    }

    componentWillMount(){
        const { storageLogin } = this.props;
        storageLogin();
    }

    toLink(e :any){
        switch(e.key){
            case '1':
                location.replace("#/ua");
            break;
            case 'dramas':
                location.replace("#/ua/dramas");
            break;
            case 'cdrama':
                location.replace("#/ua/cdrama");
            break;
            case 'setting_info':
                location.replace("#/ua/setting/info");
            break;
            case 'setting_presentation':
                location.replace("#/ua/setting/presentation");
            break;
            default:
                location.replace("#/");
            break;
        }
    }

    render() {
        return (
          <Layout className="UserAdmin" style={{ minHeight: '100vh' }}>
              <Sider className={"ua_menu"} width={256}>
                  <div className={'logo_a'}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>编辑库</h1>
                    </Link>
                  </div>
                  <Menu theme="dark" defaultOpenKeys={["sub1"]} mode="inline" onClick={this.toLink} >
                    <Menu.Item key="host">
                        <Icon type="home" />
                        <span>网站主页</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="book" /><span>剧本管理</span></span>}>
                        <Menu.Item key="dramas">剧本管理</Menu.Item>
                        <Menu.Item key="cdrama">新建剧本</Menu.Item>                      
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="pie-chart" /><span>个人设置</span></span>}>
                        <Menu.Item key="setting_info">用户信息</Menu.Item>
                        <Menu.Item key="setting_presentation">用户简介</Menu.Item>                      
                    </SubMenu>
                  </Menu>
              </Sider>
              <Body>{this.props.children}</Body>
          </Layout>
        );
      }
}

import { connect } from 'react-redux';
import { storageLogin } from '../../../redux/Login'
import { bindActionCreators } from 'redux';
export default connect((state :any ,props :any) :any => ({
  User : state.UserReducer
}),dispatch => ({
  storageLogin :bindActionCreators(storageLogin, dispatch),
}))(UserAdministrationLayout);