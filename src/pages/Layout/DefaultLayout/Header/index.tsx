import './styles.less';
import * as React from 'react';
import Menu from './Menu';
import { Layout ,Avatar ,Popover ,Button ,Divider ,Icon } from 'antd';
import { Link } from 'react-router-dom';
const logo = require('../../../../public/img/logo.ico');
const { Header } = Layout;

class HeaderComponent extends React.Component<any,any> {

  constructor(props:any){
    super(props);
    this.state = {
      User :{ }
    }
  }

  componentWillMount(){
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout = () => {
    let { dispatch } = this.props;
    this.setState({ isLogin :false },() => {
      dispatch({type: "DESTROY_USER"})
    })
  }

  componentWillReceiveProps(nextProps: any){
    const { User } = nextProps;
    if(User){
      this.setState({User})
      // console.log(User)
    }
  }

  getUserDOM = () => {
    return (
      <div style={{ width :200}}>
        <div style={{marginTop:24}}><Link to={`/ua/notify`}><Icon type="bell" />&nbsp;&nbsp;我的消息</Link></div>
        <Divider />
        <p style={{textAlign:'center'}}><Button type={'primary'}><Link to={`/ua/dramas`}>管理用户后台</Link></Button></p>
        <p style={{textAlign:'center'}}><Button type="danger" onClick={this.onLogout}>注销</Button></p>
      </div>
    )
  }

  render() {
    return (
      <Header>
        <div className="logoDefault"><img src={logo} alt="logo" /></div>
        {
          this.state.User.token ? 
          <div className="UserDefault">
            <Popover placement="bottom" content={this.getUserDOM()}>
              <Avatar src={this.state.User.avatar} />
              <span>{this.state.User.name}</span>
            </Popover>
          </div> : ''
        }
        <Menu />
      </Header>
    );
  }
}

import { connect } from 'react-redux';
import { storageLogin } from '../../../../redux/Login'
import { bindActionCreators } from 'redux';
export default connect((state :any ,props :any) :any => ({
  User : state.UserReducer
}),dispatch => ({
  storageLogin :bindActionCreators(storageLogin, dispatch),
  dispatch :dispatch
}))(HeaderComponent);

