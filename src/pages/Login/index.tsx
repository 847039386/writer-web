import * as React from 'react';
import DocumentTitle from 'react-document-title';
import './styles.less';
import { Link } from 'react-router-dom'
import { Form, Icon, Input ,Button ,Checkbox} from 'antd';
const FormItem = Form.Item;
class LoginComponent extends React.Component<any,any> {
    constructor (props :any) {
        super(props)
        this.state = {
            submitting : false
        }
    }
    componentDidMount(){

    }
    onLogin = (e :any) => {
        this.setState({ submitting : true})
    }
    render (){
        const { getFieldDecorator } = this.props.form;
        const type = 'account'
        return (
            <DocumentTitle title={'登陆'} >
                <div className={'container'}>
                    <div className={'top'}>
                        <div className={'header'}>
                        <Link to="/">
                            <img alt="" className={'logo'} src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
                            <span className={'title'}>Ant Design</span>
                        </Link>
                        </div>
                        <p className={'desc'}>Ant Design 是西湖区最具影响力的 Web 设计规范</p>
                    </div>
                    <div className={'main'}>
                            <Form className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                    rules: [{
                                        required: type === 'account', message: '请输入账户名！',
                                    }],
                                    })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="user" className={'prefixIcon'} />}
                                        placeholder="请输入..."
                                    />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                    rules: [{
                                        required: type === 'account', message: '请输入密码！',
                                    }],
                                    })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="lock" className={'prefixIcon'} />}
                                        type="password"
                                        placeholder="请输入..."
                                    />
                                    )}
                                </FormItem>
                                <FormItem className={'additional'}>
                                    {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    })(
                                    <Checkbox className={'autoLogin'}>自动登录</Checkbox>
                                    )}
                                    <a className={'forgot'} href="">忘记密码</a>
                                    <Button size="large" loading={this.state.submitting} className={'submit'} type="primary" onClick={this.onLogin} >
                                    { this.state.submitting ? '登录中' : '登录' }
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                </div>
            </DocumentTitle>
        )
    }

}

export default Form.create()(LoginComponent)
