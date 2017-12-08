import * as React from 'react';
import { Layout , Menu ,Icon  } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const logo = require('../../../public/img/logo.svg');
import { Link } from 'react-router-dom'
import Body from './Body';
import './styles.less';
class AdministrationLayout extends React.Component<any,any> {

    constructor(props:any){
        super(props)
        this.toLink = this.toLink.bind(this)
    }

    componentDidMount() {
       
    }

    toLink(e :any){
        switch(e.key){
            case 'index':
                location.replace("#/admin");
            break;
            case 'dramas':
                location.replace("#/admin/dramas");
            break;
            case 'comment':
                location.replace("#/admin/comment");
            break;
            case 'topics':
                location.replace("#/admin/topics");
            break;
            case 'topic':
                location.replace("#/admin/topic");
            break;
            case 'setting':
                location.replace("#/admin/setting");
            break;
            case 'category':
                location.replace("#/admin/category");
            break;
            case 'book':
                location.replace("#/admin/book");
            break;
        }
    }

    render() {
        return (
          <Layout style={{ minHeight: '100vh' }}>
              <Sider className={"ua_menu"} width={256}>
                <div className={'logo_a'}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>编辑库</h1>
                    </Link>
                </div>
                  <Menu theme="dark" defaultOpenKeys={["sub1"]} mode="inline" onClick={this.toLink} >
                      <Menu.Item key="index"><Icon type="home" /><span>主页</span></Menu.Item>
                      <SubMenu key="sub1" title={<span><Icon type="book" /><span>剧本管理</span></span>}>
                          <Menu.Item key="dramas">剧本管理</Menu.Item>
                          <Menu.Item key="comment">评论管理</Menu.Item> 
                          <Menu.Item key="category">剧情类型</Menu.Item>
                          <Menu.Item key="book">剧本类型</Menu.Item>                       
                      </SubMenu>
                      <SubMenu key="sub2" title={<span><Icon type="credit-card" /><span>站内文章</span></span>}>
                          <Menu.Item key="topic">添加文章</Menu.Item>
                          <Menu.Item key="topics">文章管理</Menu.Item>                       
                      </SubMenu>
                      <Menu.Item key="setting"><Icon type="setting" /><span>个人设置</span></Menu.Item>
                  </Menu>
              </Sider>
              <Body>               
                {this.props.children}
              </Body>
          </Layout>
        );
      }
}

// import { connect } from 'react-redux'
// export default connect((state :any) : any=>  {
//     if(state.UserReducer.token){
//         return { UserInfo :JSON.stringify(state.UserReducer)}
//     }else{
//         return { UserInfo :null}
//     }
// })(AdministrationLayout)
export default AdministrationLayout
