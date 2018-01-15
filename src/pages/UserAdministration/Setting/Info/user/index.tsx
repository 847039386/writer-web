import * as React from 'react';
import { Row ,Button ,Col ,Icon ,Input ,Badge, message } from 'antd';
import { User } from '../../../../../axios'


interface verifyMSG {
    success : boolean;
    msg :string
}


interface Props {
    uid :string,            // 用户id
    token :string,          // 用户token
    identifier? :string,    // 用户名
}

interface State {
    identifier :string;                 // 用户的用户名 （如果用户绑定了用户名则有值否则没有）
    username :string;                   // 用户的用户名 （这里只有在绑定用户的时候才会出现）
    detectionUserNameLoading :boolean;  // 验证用户名是否重复的加载状态
    detectionUserNameSuccess :boolean;   // 验证 用户名是否重复
    detectionUserNameMSG :verifyMSG;    // 验证 用户名是否重名的消息。
    detectionResultMSG :verifyMSG;      // 提交 (修改密码,绑定用户) 后的消息。
    password :string;                   //密码
    repeat_password :string;            // 重复密码
    input_type :string;                 // 密码 的input属性 --用于取消浏览器表单存储
    saveUNLoading :boolean;             // 提交 修改密码或者绑定用户 时的 加载状态
    isUpdatePassword:string;           // 当前是否是修改密码 （修改密码 || 绑定本站用户）
    oldPassword :string;                // 用户的旧密码

    sendPACLoading :boolean;     // 获取验证码是否加载
    email_pac :'';               // 修改密码时候的验证码
    email :string               // 用户绑定的email 没有则无值
}


class UserBindPage extends React.Component<Props,State> {
 
  constructor(props :Props){
    super(props);
    this.state = {
        input_type :'text',
        username :'',
        password :'',
        repeat_password :'',
        identifier :props.identifier || '',
        detectionUserNameLoading :false,
        detectionUserNameSuccess :false,
        detectionUserNameMSG :{ success :false ,msg :'' },
        detectionResultMSG :{ success :false ,msg :'' },
        saveUNLoading :false,
        isUpdatePassword :'',
        oldPassword :'',

        sendPACLoading :false,
        email_pac :'',
        email :''
    }
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
    this.saveUserHOSTLogin = this.saveUserHOSTLogin.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.onEmailPACChange = this.onEmailPACChange.bind(this)
    this.sendEmailPAC = this.sendEmailPAC.bind(this)
    this.updatePassByEmail = this.updatePassByEmail.bind(this)
  }

  componentWillMount(){
     
  }

  componentWillReceiveProps(nextProps :Props){
    const { identifier } = nextProps;
    this.setState({identifier :identifier || ''})
 }

  onUserNameChange= (e :any) => {
    this.setState({ username :e.target.value })
  }
  onPasswordChange= (e :any) => {
    this.setState({ password :e.target.value })
  }
  onRepeatPasswordChange= (e :any) => {
    this.setState({ repeat_password :e.target.value })
  }
  onOldPasswordChange = (e :any) => {
    this.setState({ oldPassword :e.target.value })
  }

  detectionUserName = () =>{
    const { username } = this.state
    let user_reg = /^[a-zA-Z0-9_-]{6,16}$/;
    if(username && user_reg.test(username)){
        this.setState({detectionUserNameLoading :true});
        User.findRepeatUIdentifier(username,'username').then(({success ,data ,msg}) => {
            this.setState({ detectionUserNameLoading :false })
            if(success && !data){
                this.setState({detectionUserNameMSG :{ success :true ,msg :'该用户名可以使用'} ,detectionUserNameSuccess:true })
            }else{
                this.setState({detectionUserNameMSG :{ success :false ,msg :'该用户名不可以使用'} ,detectionUserNameSuccess :false })
            }
        })
    }else{
        this.setState({detectionUserNameMSG :{ success :false ,msg :'用户名未通过效验，原因可能是格式不对,6到16位(字母，数字，下划线，减号)'} ,detectionUserNameSuccess:false  })
    }
  }

  saveUserHOSTLogin = () =>{
    const { username ,password ,repeat_password ,detectionUserNameSuccess } = this.state
    const reg = /^[a-zA-Z0-9_-]{6,16}$/;
    if(!detectionUserNameSuccess || !username){
        this.setState({detectionResultMSG :{ success :false ,msg :'该用户名未检测或不能使用'}})
    }else if(!reg.test(password)){
        this.setState({detectionResultMSG :{ success :false ,msg :'密码格式应是：6到16位(字母，数字，下划线，减号)'}})
    }else if(password != repeat_password){
        this.setState({detectionResultMSG :{ success :false ,msg :'两次密码输入不相同'}})
    }else{
        const { uid ,token } = this.props;
        this.setState({ saveUNLoading :true });
        User.bindHostUserNameOrUpdatePassword(uid,username,password,'',token).then(({ success ,data ,msg}) => {
            this.setState({ saveUNLoading :false });
            if(success && data){
                this.resetSettingStatus({identifier:data})
            }else{
                this.setState({detectionResultMSG :{ success :false ,msg :msg || '失败'}})
            }
        })
    }
  }

  resetSettingStatus = (state? :any) =>{
        this.setState(Object.assign({
            input_type :'text',
            username :'',
            password :'',
            repeat_password :'',
            detectionUserNameLoading :false,
            detectionUserNameSuccess :false,
            detectionUserNameMSG :{ success :false ,msg :'' },
            detectionResultMSG :{ success :false ,msg :'' },
            isUpdatePassword :''
        },state || {}))
  }

  updatePassword = () => {
    const { password ,repeat_password ,identifier } = this.state
    const reg = /^[a-zA-Z0-9_-]{6,16}$/;
    if(!identifier){
        this.setState({detectionResultMSG :{ success :false ,msg :'当前没有查到用户名'}})
    }else if(!reg.test(password)){
        this.setState({detectionResultMSG :{ success :false ,msg :'密码格式应是：6到16位(字母，数字，下划线，减号)'}})
    }else if(password != repeat_password){
        this.setState({detectionResultMSG :{ success :false ,msg :'两次密码输入不相同'}})
    }else{
        const { oldPassword } = this.state
        const { uid ,token } = this.props;
        this.setState({ saveUNLoading :true });
        User.bindHostUserNameOrUpdatePassword(uid ,identifier ,password ,oldPassword ,token).then(({ success ,data ,msg}) => {
            this.setState({ saveUNLoading :false });
            if(success && data){
                this.resetSettingStatus({identifier:data})
                message.success('密码修改成功')
            }else{
                this.setState({detectionResultMSG :{ success :false ,msg :msg || '失败'}})
            }
        })
    }
  }

  bindUserNameDOM = () :React.ReactNode => {
        return (
            <div >
                    <Row style={{marginBottom :10}} gutter={8}>
                        <p style={{color:'#80848f' ,margin:'5px 0' ,paddingLeft:20 ,fontSize:12}}><span style={{color:'red'}}>*&nbsp;&nbsp;</span>用户名一旦确定将不能修改，请谨慎操作</p>
                        <Col span={16}>
                            <Input
                                disabled={this.state.detectionUserNameLoading}
                                size="large"
                                onChange={this.onUserNameChange}
                                prefix={<Icon type="user" className={'prefixIcon'} />}
                                placeholder="请输入用户名"
                            />
                        </Col>
                        <Col span={6}>
                            <Button loading={this.state.detectionUserNameLoading} disabled={this.state.detectionUserNameLoading} onClick={this.detectionUserName} size={'large'}  >检测</Button>
                        </Col>
                    </Row>
                    {
                        this.state.detectionUserNameMSG.success || this.state.detectionUserNameMSG.msg ?
                        <Badge status={ this.state.detectionUserNameMSG.success ? 'success' : 'error' } text={this.state.detectionUserNameMSG.msg} />
                        : ''
                    }
                    <Row  gutter={8}>
                        <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                            <Input
                                disabled={this.state.detectionUserNameLoading}
                                size="large"
                                onChange={this.onPasswordChange}
                                prefix={<Icon type="lock" className={'prefixIcon'} />}
                                placeholder="请输入密码"
                                type={this.state.input_type}
                                onClick={()=>{this.setState({input_type:"password"})}}
                            />
                        </Col>
                        <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                            <Input
                                disabled={this.state.detectionUserNameLoading}
                                size="large"
                                type={this.state.input_type}
                                onClick={()=>{this.setState({input_type:"password"})}}
                                onChange={this.onRepeatPasswordChange}
                                prefix={<Icon type="lock" className={'prefixIcon'} />}
                                placeholder="请再次确认密码"
                            />
                        </Col>
                    </Row>
                    {
                        this.state.detectionResultMSG.success || this.state.detectionResultMSG.msg ?
                        <Badge status={ this.state.detectionResultMSG.success ? 'success' : 'error' } text={this.state.detectionResultMSG.msg} />
                        : ''
                    }
                    <Button onClick={this.saveUserHOSTLogin} style={{marginBottom :10 ,marginTop:10 ,display:'block'}} type={'primary'} size="large">提交</Button>
            </div>
        )
  }

  updatePasswordDOM = () => {
      return (
          <div>
              <Row  gutter={8}>
                <Col span={24} style={{marginBottom :10 ,marginTop:10}}>当前绑定用户名：{ this.state.identifier }</Col>
                <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                    <Input
                        disabled={this.state.detectionUserNameLoading}
                        size="large"
                        onChange={this.onOldPasswordChange}
                        prefix={<Icon type="lock" className={'prefixIcon'} />}
                        placeholder="请输入旧密码"
                        type={this.state.input_type}
                        onClick={()=>{this.setState({input_type:"password"})}}
                    />
                </Col>
                <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                    <Input
                        disabled={this.state.detectionUserNameLoading}
                        size="large"
                        onChange={this.onPasswordChange}
                        prefix={<Icon type="lock" className={'prefixIcon'} />}
                        placeholder="请输入密码"
                        type={this.state.input_type}
                        onClick={()=>{this.setState({input_type:"password"})}}
                    />
                </Col>
                <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                    <Input
                        disabled={this.state.detectionUserNameLoading}
                        size="large"
                        type={this.state.input_type}
                        onClick={()=>{this.setState({input_type:"password"})}}
                        onChange={this.onRepeatPasswordChange}
                        prefix={<Icon type="lock" className={'prefixIcon'} />}
                        placeholder="请再次确认密码"
                    />
                </Col>
            </Row>
            {
                        this.state.detectionResultMSG.success || this.state.detectionResultMSG.msg ?
                        <Badge status={ this.state.detectionResultMSG.success ? 'success' : 'error' } text={this.state.detectionResultMSG.msg} />
                        : ''
            }<br/>
            <Button onClick={this.updatePassword} style={{marginBottom :10 ,marginTop:10 }} type={'primary'} size="large">提交</Button>&nbsp;&nbsp;
            <Button onClick={() => { this.setState({isUpdatePassword :''}) }} style={{marginBottom :10 ,marginTop:10 }} size="large">返回</Button>
          </div>
      )
  }

  updatePassByEmail = () => {
    const reg = /^[a-zA-Z0-9_-]{6,16}$/;
    const { uid ,token } = this.props;
    const { password ,repeat_password ,email_pac } = this.state;
    if(reg.test(password) && password == repeat_password && email_pac){
        this.setState({saveUNLoading :true});
        console.log(uid,password,email_pac,token)
        User.updatePassByEmail(uid,password,email_pac,token).then(({success ,data ,msg}) => {
            this.setState({saveUNLoading :false});
            if(success){
                this.resetSettingStatus()
                message.success('密码修改成功')
            }else{
                message.error(`密码修改失败，原因可能是：${msg}`)
            }
        })
    }else if(password != repeat_password){
        message.error('两次密码输入不相同')
    }else if(!email_pac){
        message.error('请输入正确的验证码')
    }else{
        message.error('密码格式应是：6到16位(字母，数字，下划线，减号)')
    }
  }

  sendEmailPAC = () => {
    const { uid ,token } = this.props;
    this.setState({sendPACLoading :true })
    User.userBindStatus(uid,token).then(({ success ,msg ,data}) => {
        if(success && data){
          let email = '';
          data.forEach((uStatus) => {
            if(uStatus.identity_type == 'email'){
                email = uStatus.identifier || '';
            }
          })
          // 当用户绑定了email的时候
          if(email){
            User.findEmailSendPAC(uid,email).then(({ success ,data ,msg}) => {
                this.setState({sendPACLoading :false })
                if(success){
                    message.success(`验证码已发送至您的绑定邮箱 > ${email}`)
                }else{
                    message.error(`验证码发送失败，原因可能是：${msg}`)
                }
            })
          }else{
            this.setState({sendPACLoading :false })
            message.error(`您并没有绑定email，为了您的账户安全，请去绑定email`)
          }
        }else {
            this.setState({sendPACLoading :false })
            message.error(`验证码发送失败，原因可能是：${msg}`)
        }
    })
  }

  onEmailPACChange = ( e :any) => {
    this.setState({ email_pac :e.target.value })
  }

  updatePassByEmailDOM = () => {
    return (
        <div>
            <Row  gutter={8}>
              <Col span={24} style={{marginBottom :10 ,marginTop:10}}>当前绑定用户名：{ this.state.identifier }</Col>
              <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                <Row gutter={8}>
                <Col span={16}>
                        <Input
                            disabled={this.state.sendPACLoading}
                            size="large"
                            onChange={this.onEmailPACChange}
                            prefix={<Icon type="mail" className={'prefixIcon'} />}
                            placeholder="请输入验证码"
                        />
                    </Col>
                    <Col span={6}>
                        <Button loading={this.state.sendPACLoading} disabled={this.state.sendPACLoading} onClick={this.sendEmailPAC} size={'large'}  >获取验证码</Button>
                    </Col>
                </Row>
              </Col>
              <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                  <Input
                      disabled={this.state.detectionUserNameLoading}
                      size="large"
                      onChange={this.onPasswordChange}
                      prefix={<Icon type="lock" className={'prefixIcon'} />}
                      placeholder="请输入密码"
                      type={this.state.input_type}
                      onClick={()=>{this.setState({input_type:"password"})}}
                  />
              </Col>
              <Col span={24} style={{marginBottom :10 ,marginTop:10}}>
                  <Input
                      disabled={this.state.detectionUserNameLoading}
                      size="large"
                      type={this.state.input_type}
                      onClick={()=>{this.setState({input_type:"password"})}}
                      onChange={this.onRepeatPasswordChange}
                      prefix={<Icon type="lock" className={'prefixIcon'} />}
                      placeholder="请再次确认密码"
                  />
              </Col>
          </Row>
          {
                      this.state.detectionResultMSG.success || this.state.detectionResultMSG.msg ?
                      <Badge status={ this.state.detectionResultMSG.success ? 'success' : 'error' } text={this.state.detectionResultMSG.msg} />
                      : ''
          }<br/>
          <Button onClick={this.updatePassByEmail} style={{marginBottom :10 ,marginTop:10 }} type={'primary'} size="large">提交</Button>&nbsp;&nbsp;
          <Button onClick={() => { this.setState({isUpdatePassword :''}) }} style={{marginBottom :10 ,marginTop:10 }} size="large">返回</Button>
        </div>
    )
  }



  getResultDOM = () :React.ReactNode => {
      const { identifier ,isUpdatePassword } = this.state;
      if(identifier && !isUpdatePassword ){
            return (<div>
                已绑定用户名 ：{this.state.identifier}<br/><br/>
                <a style={{display:'block'}} onClick={() => { this.resetSettingStatus({isUpdatePassword :'oldPass' }); }} >通过旧密码修改密码</a><br/>
                <a style={{display:'block'}} onClick={() => { this.resetSettingStatus({isUpdatePassword :'email' }); }} >通过邮箱修改密码</a>
                </div>)
      }else if(identifier && isUpdatePassword == 'oldPass'){
            return this.updatePasswordDOM();
      }else if (identifier && isUpdatePassword == 'email'){
        return this.updatePassByEmailDOM()
      }else if( !identifier ){
          return this.bindUserNameDOM();
      }else {
          return (<div>出现了某种错误，请刷新页面</div>)
      }
  }

  render() {
    return (
        <div style={{ width :500 ,margin:'0 auto'}}>
            {this.getResultDOM()}
        </div>
    )
  }
}

export default UserBindPage

