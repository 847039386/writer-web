import * as React from 'react';
import './styles.less'
import { parseQueryString } from '../../../common/util';
import { Button } from 'antd';
import Result from '../../../components/Result';
import { User as UserAjax } from '../../../axios'
import { Link } from 'react-router-dom'

class LAuth extends React.PureComponent<any, any> {
  redirectURI : string;
  constructor(props :any) {
    super(props);
    this.state = {
      redirectM : 3,
      title :'',
      status : '',
      loading :true
    }
  }
  componentWillMount(){
    const { qqLogin ,User } = this.props
    let query :any = parseQueryString(this.props.location.search);
    // 判断是否有重定向地址的参数
    if(query.redirectURI){
      let url = decodeURIComponent(query.redirectURI).split('#')
      this.redirectURI = url[0] || url[1]
    }else{
      this.redirectURI = '/'
    }

    // 第三方平台是QQ
    if(query.platform && query.platform == 'qq' && query.code){
      if(query.type == 'login'){
        // 这里是登陆
        qqLogin(query.code)
      }else if(query.type == 'bind' && query.uid && User.token){
        // 这里是绑定
        UserAjax.bindUserQQ(query.code,query.uid,User.token).then(({success , data ,msg}) => {
            if(success){
              location.replace('#'+this.redirectURI)
            }else{
              this.setState({title :`绑定失败：${msg}` ,status :'error' ,loading :false})
            }
        })
      }else{
        this.setState({title :'第三方获取失败' ,status :'error' ,loading :false})
        this.errorRedirect()
      }
    }else{
      this.setState({title :'第三方获取失败' ,status :'error' ,loading :false})
      this.errorRedirect()
    }
  }

  componentWillReceiveProps(nextProps: any){
    const { User } = nextProps;
    if(User.token){
      this.setState({title :'第三方登陆成功' ,status :'success' ,loading :false })
      location.replace('#'+this.redirectURI)
    }else{
      this.setState({title :'第三方登陆失败' ,status :'error' ,loading :false })
      this.errorRedirect()
    }
  }

  errorRedirect = () =>{
    let timers = setTimeout(() => {
      this.setState({ redirectM :  this.state.redirectM - 1},() => {
        if(this.state.redirectM <= 0){
          clearTimeout(timers)
          location.replace('#'+this.redirectURI)
        }else{
          this.errorRedirect()
        }
      })
    },1000)
  }

  render() {
    return (
        <div className="bm_lauth">
            {
              this.state.loading ?
              <div>正在登陆请稍等...</div> :
              <Result type={this.state.status} title={this.state.title} description={
                this.state.status === 'error' ? `第三方登陆出现错误 ${this.state.redirectM} 秒后将跳转至登陆前页面！` : ''
              } actions={
                this.state.status === 'error' ? 
                  <div><Button type={'primary'} ><Link to={this.redirectURI} >返回</Link></Button>&nbsp;&nbsp;<Button><Link to={'/'} >返回首页</Link></Button></div>
                 : ''
              } />
            }
        </div>
    );
  }
}

import { connect } from 'react-redux'
import { qqLogin } from '../../../redux/Login'
import { bindActionCreators } from 'redux';
export default connect((state :any ,props :any) :any => ({
  LoginReducer :state.LoginReducer,
  User : state.UserReducer
}),dispatch => ({
  qqLogin: bindActionCreators(qqLogin, dispatch),
}))(LAuth);