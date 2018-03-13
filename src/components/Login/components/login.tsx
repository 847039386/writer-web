import * as React from 'react';
import { Input ,Button ,Form } from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';


interface State {
    username: string,
    password :string,
    disabled :boolean
}

interface Props {
    onLogin(email :string ,password :string) :void,
    disabled? :boolean
}

class Login extends React.Component<Props & FormComponentProps ,State> {
  constructor(props :Props & FormComponentProps ) {
    super(props);
    this.state = {
      username: '',
      password :'',
      disabled :props.disabled || false
    }
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin() {
      const { form } = this.props
      form.validateFields((err :any, values :any) => {
        if (!err) {
          this.props.onLogin(values.username,values.password)
        }
      });
  }

  componentWillReceiveProps(nextProps: any){
        const { disabled } = nextProps;
        this.setState({ disabled })
  } 

  onChangeUserName = (e :any) => {
    this.setState({username :e.target.value})
  }

  onChangePassword = (e :any) => {
    this.setState({password :e.target.value})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form className={'login-form'}>
            <Form.Item>
            {getFieldDecorator('username', {
                validateTrigger :'onBlur',
                rules: [{ required: true , whitespace :true, message: '用户名不允许为空' }],
            })(
                <Input disabled={this.state.disabled} onChange={this.onChangeUserName} placeholder="用户名" />
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

export default  Form.create()(Login)