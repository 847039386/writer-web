import * as React from 'react';
import { Button ,Menu ,Layout ,Anchor } from 'antd'
const { Content, Sider } = Layout;
import { UserState ,UserModel } from './constraint'
import Presentation from './Presentation'
import Production from './Production'
import { User as UserAjax } from '../../../axios'
import './index.less'

class AuthorPage extends React.Component<any,UserState> {
  constructor(props :any){
    super(props)
    this.handleMenu = this.handleMenu.bind(this)
    this.state = {
      User : new UserModel(),
      UserPageType : this.props.match.params.type,
      UserId : this.props.match.params.id,
      UserBodyComponent : null
    }
  }

  componentWillMount() {
    this.handlePage()  
  }

  handlePage = () => {
    if(!this.state.UserId || !this.state.UserPageType){
       location.replace("#/");
    }else{
      this.getUser(this.state.UserId);
      this.handleUserBody(this.state.UserPageType)
    }  
  }

  getUser = (id :string) => {
    UserAjax.getUserById(id).then(({success ,data}) => {
      if(success && data){
        this.setState({
          User :data
        })
      }
    })
  }

 handleUserBody(type :string){
    switch(type){
      case 'presentation':
        this.setState({UserBodyComponent : (<Presentation id={this.props.match.params.id} />)})
      break;
      case 'production':
        this.setState({UserBodyComponent : (<Production />)})
      break;
    }
  }

  handleMenu = (e :any) => {
    this.handleUserBody(e.key)
  }

  render() {
    return (  
        <Layout className="author theme_CSider" style={{ background: '#fff' }}>            
            <Sider width={240} style={{height:'auto' }}>
              <Anchor className="cb_menu" style={{ minHeight: 520}} >
                <div style={{padding:'10px 0',textAlign: 'center' ,color:'#FFF'}}>
                  <img className="avatar" src="http://img1.skqkw.cn:888/2014/12/06/09/m1pt2mujtwt-77324.jpg" />
                  <p style={{fontSize: 14 ,margin:'5px 0'}}>{this.state.User.name}</p>
                  <p><Button type="primary">关注</Button>&nbsp;&nbsp;<Button type="primary">站内信</Button> </p>
                </div>
                <Menu mode="inline" theme="dark" onClick={this.handleMenu}>
                    <Menu.Item key="presentation">简介</Menu.Item>
                    <Menu.Item key="production">作品</Menu.Item>
                </Menu>
              </Anchor>
            </Sider>
            
            <Content >
              <div className="user_body theme_DContent" style={{ padding: '10px 24px' ,minHeight: 700}}>
                { this.state.UserBodyComponent }
              </div>
            </Content>
        </Layout>
    );
  }
}

export default AuthorPage
