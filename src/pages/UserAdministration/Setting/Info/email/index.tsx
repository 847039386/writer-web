import * as React from 'react';
import { Row ,Button ,Col ,Icon ,Input ,Badge ,message } from 'antd';
import { User } from '../../../../../axios'


interface verifyMSG {
    success : boolean;
    msg :string
}

interface Props {
    uid :string,
    token :string,
    identifier? :string
}

interface State {
    userEmail :string;
    userEmailStatus :boolean;
    detectionEmailLoading :boolean;     // 检测电子邮箱loading
    detectionEmailMSG :verifyMSG;            // 验证电子邮箱的消息
    pacCodeMSG :verifyMSG;                // 获取验证码的消息
    codeLoading :boolean;       // 验证码发送loading
    detectionEmailSuccess :boolean; // 验证邮箱是否通过
    codeSuccess :boolean;   // 验证码是否获取成功
    email :string,
    code :string
}

class EmailBindPage extends React.Component<Props,State> {
 
  constructor(props :Props){
    super(props)
    this.state = {
        userEmail :props.identifier || '',
        userEmailStatus :false,
        detectionEmailLoading :false,
        detectionEmailMSG :{ success :false ,msg :'' },
        pacCodeMSG :{ success :false ,msg :'' },
        codeLoading :false,
        detectionEmailSuccess :false,
        codeSuccess :false,
        email:'',
        code :''
    }
    this.detectionEmail = this.detectionEmail.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.saveUserEmail = this.saveUserEmail.bind(this);
    this.setUserEmailStatus = this.setUserEmailStatus.bind(this);
  }

  componentWillMount(){
    
  }

  componentWillReceiveProps(nextProps :Props){
      const { identifier } = nextProps;
      this.setState({userEmail :identifier || ''})
  }
  
  onEmailChange = (e :any) => {
    this.setState({ email :e.target.value })
  }

  onCodeChange = (e :any) => {
    this.setState({ code :e.target.value })
  }

  setUserEmailStatus = () => {
    this.setState({ userEmailStatus :true});
  }

  detectionEmail = () => {
    const { email } = this.state
    const email_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if(email && email_reg.test(email)){
        this.setState({ detectionEmailLoading :true })
        User.findRepeatUIdentifier(email,'email').then(({success ,data ,msg}) => {
            this.setState({ detectionEmailLoading :false })
            if(success && !data){
                this.setState({detectionEmailMSG :{ success :true ,msg :'该邮箱可以使用'} ,detectionEmailSuccess:true })
            }else{
                this.setState({detectionEmailMSG :{ success :false ,msg :'该邮箱不可以使用'} ,detectionEmailSuccess :false })
            }
        })
    }else{
        this.setState({detectionEmailMSG :{ success :false ,msg :'邮箱未通过效验，原因可能是格式不对'} ,detectionEmailSuccess:false  })
    }
  }

  sendPacCode = () => {
     const { email ,userEmail } = this.state;
     const { uid } = this.props;
     const email_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
     if(email && email_reg.test(email) && uid){
        this.setState({codeLoading :true})
        let pacEmail = userEmail ? userEmail : email; 
        User.findEmailSendPAC(uid,pacEmail).then(({ success ,data ,msg}) => {
            this.setState({codeLoading :false})
            if(success){
                this.setState({ pacCodeMSG :{ success :true ,msg :`验证码已发送至您的绑定邮箱 > ${pacEmail}`} ,codeSuccess :true })
            }else{
                this.setState({ pacCodeMSG :{ success :false ,msg :'邮件发送错误'} ,codeSuccess :false })
            }
        })
     }else{
        this.setState({ pacCodeMSG :{ success :false ,msg :'邮箱格式不正确'} ,codeSuccess :false })
     }
  }

  resetSettingEmailStatus = () =>{
    this.setState({  
        userEmailStatus :false ,
        code:'' ,
        detectionEmailSuccess:false ,
        codeSuccess :false,
        detectionEmailMSG :{ success :false ,msg :'' },
        pacCodeMSG :{ success :false ,msg :'' },
    })
  }

  saveUserEmail = () => {
    const { email ,code } = this.state;
    const { uid ,token } = this.props;
    const email_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if(email && email_reg.test(email) && uid && code && token){
        User.bindUserEmail(uid,email,code,token).then(({ success ,data ,msg }) => {
            if(success){
                this.resetSettingEmailStatus();
                this.setState({  userEmail :email })
                message.success('邮箱绑定成功');
            }else{
                message.error(`邮箱绑定失败，原因可能是：${msg}`);
            }
        })
    }else{
        message.error(`错误的提交`);
    }
  }


  getUtEmailDOM = () :React.ReactNode => {
    return (
        <div>
            { this.state.userEmail ? <p>当前绑定邮箱：{this.state.userEmail}</p> : '' }
            <Row style={{marginBottom :10}} gutter={8}>
                <Col span={16}>
                    <Input
                        disabled={this.state.detectionEmailLoading}
                        size="large"
                        onChange={this.onEmailChange}
                        prefix={<Icon type="mail" className={'prefixIcon'} />}
                        placeholder="请输入邮箱"
                    />
                </Col>
                <Col span={6}>
                    <Button loading={this.state.detectionEmailLoading} disabled={this.state.detectionEmailLoading} onClick={this.detectionEmail} size={'large'}  >检测</Button>
                </Col>
            </Row>
            {
                this.state.detectionEmailMSG.success || this.state.detectionEmailMSG.msg ?
                <Badge status={ this.state.detectionEmailMSG.success ? 'success' : 'error' } text={this.state.detectionEmailMSG.msg} />
                : ''
            }
            <Row style={{marginBottom :10 ,marginTop :10}} gutter={8}>
                {
                    this.state.codeSuccess ?
                    <Col span={16}>
                        <Input
                            disabled={this.state.codeLoading || !this.state.detectionEmailSuccess} 
                            onChange={this.onCodeChange}
                            size="large"
                            prefix={<Icon type="lock" className={'prefixIcon'} />}
                            placeholder="请输入验证码"
                        />
                    </Col> : ''
                }
                <Col span={6}>
                    <Button loading={this.state.codeLoading} onClick={this.sendPacCode} disabled={this.state.codeLoading || !this.state.detectionEmailSuccess } size={'large'}  >获取验证码</Button>
                </Col>
            </Row>
            {
                this.state.pacCodeMSG.success || this.state.pacCodeMSG.msg ?
                <Badge status={ this.state.pacCodeMSG.success ? 'success' : 'error' } text={this.state.pacCodeMSG.msg} />
                : ''
            }
            <Button onClick={this.saveUserEmail} style={{marginBottom :10 ,marginTop :10 ,display:'block'}}  disabled={!this.state.detectionEmailSuccess || !this.state.codeSuccess || !this.state.code || this.state.codeLoading || this.state.detectionEmailLoading} size={'large'}  type={'primary'} >提交</Button>
        </div>
    )
  }

  render() {
    return (
      <div style={{ width :500 ,margin:'0 auto'}} >
        {
            this.state.userEmail && !this.state.userEmailStatus ?
            <div>已绑定邮箱：{ this.state.userEmail }&nbsp;&nbsp;<a onClick={this.setUserEmailStatus} >更改</a></div>
            : this.getUtEmailDOM()
        }
      </div>
    );
  }
}

export default EmailBindPage

