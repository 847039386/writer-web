import * as React from 'react';
import { Input ,Button ,Avatar ,Card ,Icon ,Divider } from 'antd';
import { LoginState ,LoginProps } from './constraint';
import { Link } from 'react-router-dom';
import './index.less';



class Login extends React.Component<LoginProps, LoginState> {
  constructor(props :any) {
    super(props);
    const { User } = props

    this.state = {
      username: '',
      password :'',
      loading :false,
      loginState :User.token ? true : false
    }
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin() {
    const { onLogin } = this.props
    if(onLogin){
      onLogin(this.state.username,this.state.password)
    }
  }

  componentWillReceiveProps(nextProps: any){
    const { LoginReducer ,User } = nextProps;
    if(LoginReducer.isFetching){
      this.setState({loading : true})
    }else{ 
      this.setState({loading : false})
      if(!User.token){
        if(LoginReducer.request.success){
          this.setState({loginState :true})
          if(this.props.success){      
            this.props.success()
          }
        }else {
          if(this.props.error){
            this.props.error()
          }
        }
      }
    }
  }

  onChangeUsername = (e :any) => {
    this.setState({username :e.target.value})
  }

  onChangePassword = (e :any) => {
    this.setState({password :e.target.value})
  }

  longinComponent = () => {
    return (
        <div>
          <ul>
            <li><Input onChange={this.onChangeUsername} placeholder="邮箱" /></li>
            <li><Input onChange={this.onChangePassword} placeholder="密码" /></li>
            <li><Button loading={this.state.loading} onClick={this.onLogin} style={{width:'100%'}} type="primary">登陆</Button></li>
          </ul>
          <Divider><span style={{fontSize :14}}>第三方登陆</span></Divider>
          <div style={{ textAlign :'center' ,fontSize :32 }}>
            <span className={'myicon miwchat'} ><Icon type={'qq'} style={{ background :'#538DCB' ,padding: '6px 8px'}} /></span>&nbsp;&nbsp;
            <span className={'myicon miqq'} ><Icon type={'wechat'} style={{ padding: '6px 8px' ,background :'#0FCF1A'}} /></span>
          </div>
        </div>
    )
  }

  onLineComponent = () => {
    return (
      <div className="onLine" >
        <div className="onLine_head" ><Avatar src={"http://img.qq1234.org/uploads/allimg/140831/3_140831133724_5.png"} size="large">Avatar</Avatar></div>     
        <div className="onLine_body">
          <p>{this.props.User.name}</p>
          <p><Link to={`/ua`}>管理用户后台</Link></p>
          <p><Link to={`/admin`}>管理后台</Link></p>
        </div>
      </div>
    )
  }

  getClassName = () :string =>{
    if(this.props.card){
      return "loginCard theme_CCard"
    }else{
      return `loginCard theme_CCard ${this.props.className || ''}`
    }
  } 

  render() {
    const statusComponent = this.state.loginState? this.onLineComponent() : this.longinComponent()
    const loginComponent = <div className={ this.getClassName() }>{statusComponent}</div>
    const resultComponent = this.props.card ? <Card className={this.props.className || 'theme_CCard'}>{loginComponent}</Card> : loginComponent
    return (
      <div>{resultComponent}</div>
    );
  }
}


import { connect } from 'react-redux'
import { onLogin } from '../../redux/Login'
import { bindActionCreators } from 'redux';
export default connect((state :any) :any => ({
  LoginReducer :state.LoginReducer,
  User : state.UserReducer
}),dispatch => ({
  onLogin: bindActionCreators(onLogin, dispatch)
}))(Login);
