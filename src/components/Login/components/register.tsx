import * as React from 'react';
import { Input ,Button ,Form } from 'antd';
import { User } from '../../../axios';
import {FormComponentProps} from 'antd/lib/form/Form';


interface State {
    username: string,
    password :string,
    nickname :string,
    ppassword :string,
    disabled :boolean,
    allowUserName :boolean,
    selectLoading :boolean
}

interface Props {
    onRegister(nickname :string ,username :string ,password :string) :void,
    disabled? :boolean
}

class RegisterComponent extends React.Component<Props & FormComponentProps ,State> {
  oldEmail :string;
  oldEmailMsg :string;
  constructor(props :Props & FormComponentProps) {
    super(props);
    this.state = {
      username: '',
      password :'',
      nickname :'',
      ppassword:'',
      disabled :props.disabled || false,
      allowUserName : false,
      selectLoading :false
    }
    this.onRegister = this.onRegister.bind(this)
  }

  onRegister() {
      const { form } = this.props
      form.validateFields((err :any, values :any) => {
        if (!err) {
          this.props.onRegister(this.state.nickname,this.state.username,this.state.password)
        }
      });
  }

  componentWillReceiveProps(nextProps: any){
    const { disabled } = nextProps;
    this.setState({ disabled })
  }

  onChangeUsername = (e :any) => {
    this.setState({username :e.target.value})
  }

  onChangePassword = (e :any) => {
    this.setState({password :e.target.value})
  }

  onChangePPassword = (e:any) => {
    this.setState({ppassword :e.target.value})
  }

  onChangeNickname = (e :any) => {
    this.setState({nickname :e.target.value})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form className={'login-form'}>
            <Form.Item hasFeedback>
                {getFieldDecorator('nickname', {
                    validateTrigger :'onBlur',
                    rules: [{ required: true, min : 1 , max:10 ,whitespace :true,  message: '请输入有效的昵称!并且长度在2-10之间!' }],
                })(
                    <Input disabled={this.state.disabled} onChange={this.onChangeNickname} placeholder="昵称" />
                )}
            </Form.Item>
            <Form.Item hasFeedback >
                {getFieldDecorator('username', {
                    validateTrigger :'onBlur',
                    rules: [{ required: true, whitespace :true, validator :(rule :any, value :any, callback :any) => {            
                        if(this.oldEmail !== value){
                            User.findRepeatUIdentifier(value,'username').then(({success ,data})=>{
                                if(success && !data){ 
                                    this.oldEmailMsg = ''; 
                                    callback()
                                }else{         
                                    this.oldEmailMsg = '该用户名已被注册'                
                                    callback(this.oldEmailMsg)
                                }
                            })
                        }else{
                            this.oldEmailMsg ? callback(this.oldEmailMsg) : callback()
                        }
                        this.oldEmail = value;                                              
                    }}],
                })(
                    <Input disabled={this.state.disabled} onChange={this.onChangeUsername} placeholder="用户名" />             
                )}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                    validateTrigger :'onBlur',
                    rules: [{ required: true, whitespace :true, min :6 , max:20 , message: '密码不能为空,并且长度在6-20之间!' }],
                })(
                    <Input disabled={this.state.disabled} onChange={this.onChangePassword} type='password' placeholder="密码" />
                )}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('ppassword', {
                    validateTrigger :'onBlur',
                    rules: [{ required: true, validator :(rule :any, value :any, callback :any) => {    
                        if(value === this.state.password){
                            callback()
                        }else{
                            callback('两次密码输入不一致!')
                        }                                            
                    }}],
                })(
                    <Input disabled={this.state.disabled} onChange={this.onChangePPassword} type='password' placeholder="重复密码" />
                )}
            </Form.Item>
            <Form.Item>
                <Button loading={this.state.disabled} onClick={this.onRegister} style={{width:'100%'}} type="primary">注册</Button>
            </Form.Item>
        </Form>
    );
  }
}

export default Form.create<Props>()(RegisterComponent)
