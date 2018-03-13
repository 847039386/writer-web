import * as React from 'react';
import { Avatar ,Icon ,Divider ,Tabs ,Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import LoginDOM from './components/login'
import RegisterDOM from './components/register';
import Result from '../../components/Result';
import Config from '../../conf'

interface operationError {
  title :string ,
  msg :string
}

interface State {
  error :operationError,    //失败 
  loading :boolean,     //登陆中显示加载模式
  isLogin :boolean,   //是否登陆状态
  showErrorModel : boolean   //错误框
}

interface Props {
    success?():void
}

class LoginPage extends React.Component<any, State> {
  status :string;
  isLogout :boolean;
  constructor(props :any) {
    super(props);
    const { User } = props
    this.state = {
      error : { title :'未知' ,msg :'未知' },
      loading :false,
      isLogin :User.token ? true : false,
      showErrorModel :false
    }
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }

  onLogin(username :string ,password :string) {
    this.status = 'host';
    const { onLogin } = this.props
    if(onLogin){
      this.setState({ error : Object.assign(this.state.error,{ title :'登陆' }) })
      onLogin(username,password)
    }
  }

  onRegister = (nickname :string ,username :string ,password :string) => {
      this.status = 'host'
      const { onRegister } = this.props
      if(onRegister){
        this.setState({ error : Object.assign(this.state.error,{ title :'注册' }) })
        onRegister(nickname,username,password)
      }
  }

  componentWillMount(){
    const { storageLogin } = this.props;
    storageLogin();
  }



  componentWillReceiveProps(nextProps: any){
    const { LoginReducer ,User } = nextProps;
    if(this.status == 'host'){
      this.setState({loading : LoginReducer.isFetching})
    }
    if(!User.token){
      if(JSON.stringify(LoginReducer.request)!=='{}'){
        if(LoginReducer.request.success){
          if(nextProps.success){
            nextProps.success()
          }
          if(!this.isLogout){
            this.setState({isLogin :true})
          }
          if(this.state.isLogin){
            this.setState({isLogin :false})
          }
        }else {
          this.setState({ error : Object.assign(this.state.error,{ msg : LoginReducer.request.msg}) ,showErrorModel :true })
          LoginReducer.request = {};
        } 
      }
    }else{
      this.setState({isLogin :true})
    }
  }

  longinComponent = () => {
    const stateOption = {
        platform :'qq',
        type :'login' ,
        referer :location.hash
    }
    const stateOptionString = encodeURIComponent(JSON.stringify(stateOption));
    return (
        <div>
          <Tabs className={'tabs'} animated={false}>
            <Tabs.TabPane disabled={this.state.loading} tab="登陆" key="onLogin">
              <LoginDOM disabled={this.state.loading} onLogin={this.onLogin} />
            </Tabs.TabPane>
            <Tabs.TabPane disabled={this.state.loading} tab="注册" key="onRegister">
              <RegisterDOM disabled={this.state.loading} onRegister={this.onRegister} />
            </Tabs.TabPane>
          </Tabs>
          <Divider><span style={{fontSize :14}}>第三方登陆</span></Divider>
          <div style={{ textAlign :'center' ,fontSize :32 }}>
            <a href={`${Config.OAuth.qq.baseSite}?response_type=${'code'}&client_id=${Config.OAuth.qq.appID}&state=${stateOptionString}&redirect_uri=${Config.OAuth.qq.redirectURL}`}>
              <span className={'myicon miwchat'} ><Icon type={'qq'} style={{ background :'#538DCB' ,padding: '6px 8px'}} /></span>
            </a>    
            &nbsp;&nbsp;
            <span className={'myicon miqq'} ><Icon type={'wechat'} style={{ padding: '6px 8px' ,background :'#0FCF1A'}} /></span>
          </div>
        </div>
    )
  }




  onLineComponent = () :React.ReactNode => {
    return (
      <div className="onLine" >
        <div className="onLine_head" ><Avatar src={this.props.User.avatar || ''} size="large">Avatar</Avatar></div>     
        <div className="onLine_body">
          <p>{this.props.User.name}</p>
          <p><Link to={`/ua/dramas`}>管理用户后台</Link></p>
          <Button onClick={this.onLogout}>注销</Button>
        </div>
      </div>
    )
  }

  onLogout = () => {
    let { dispatch } = this.props;
    this.isLogout = true;    
    this.setState({ isLogin :false },() => {
      dispatch({type: "DESTROY_USER"})
    })
  }


  render() {
    const Component :React.ReactNode = this.state.isLogin? this.onLineComponent() : this.longinComponent();
    const ErrorDOM :React.ReactNode = <Result type={'error'} title={this.state.error.title} description={this.state.error.msg} actions={<Button onClick={()=>{this.setState({showErrorModel:false})}}>返回</Button>} />
    const ResultComponent :React.ReactNode = !this.state.showErrorModel ? Component : ErrorDOM
    return ResultComponent;
  }
}


import { connect } from 'react-redux'
import { onLogin ,onRegister ,storageLogin } from '../../redux/Login'
import { bindActionCreators } from 'redux';

export default connect((state :any ,props :Props) :any => ({
  LoginReducer :state.LoginReducer,
  User : state.UserReducer
}),dispatch => ({
  onLogin: bindActionCreators(onLogin, dispatch),
  onRegister :bindActionCreators(onRegister, dispatch),
  storageLogin :bindActionCreators(storageLogin, dispatch),
  dispatch :dispatch
}))(LoginPage);


