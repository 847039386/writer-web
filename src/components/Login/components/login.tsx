import * as React from 'react';
import { Input ,Button ,Form } from 'antd';


interface State {
    email: string,
    password :string,
    disabled :boolean
}

interface Props {
    onLogin(email :string ,password :string) :void,
    disabled? :boolean
}

class Login extends React.Component<any, State> {
  constructor(props :Props ) {
    super(props);
    this.state = {
      email: '',
      password :'',
      disabled :props.disabled || false
    }
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin() {
      const { form } = this.props
      form.validateFields((err :any, values :any) => {
        if (!err) {
          this.props.onLogin(values.email,values.password)
        }
      });
  }

  componentWillReceiveProps(nextProps: any){
        const { disabled } = nextProps;
        this.setState({ disabled })
  } 

  onChangeEmail = (e :any) => {
    this.setState({email :e.target.value})
  }

  onChangePassword = (e :any) => {
    this.setState({password :e.target.value})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form className={'login-form'}>
            <Form.Item>
            {getFieldDecorator('email', {
                validateTrigger :'onBlur',
                rules: [{ required: true, type: 'email' , whitespace :true, message: '请输入有效的邮箱!' }],
            })(
                <Input disabled={this.state.disabled} onChange={this.onChangeEmail} placeholder="邮箱" />
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
                validateTrigger :'onBlur',
                rules: [{ required: true, whitespace :true, message: '密码不能为空!' }],
            })(
                <Input disabled={this.state.disabled} onChange={this.onChangePassword} placeholder="密码" />
            )}
            </Form.Item>
            <Form.Item>
                <Button loading={this.state.disabled} onClick={this.onLogin} style={{width:'100%'}} type="primary">登陆</Button>
            </Form.Item>
        </Form>
    );
  }
}

export default Form.create<Props>()(Login)
