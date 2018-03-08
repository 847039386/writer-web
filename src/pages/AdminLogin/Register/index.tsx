import * as React from 'react';
import { Form, Icon, Input ,Button ,Row ,Col ,message } from 'antd';
import { Admin } from '../../../axios'
const FormItem = Form.Item;


class RegisterComponent extends React.Component<any,any> {
    count_down :number;
    constructor (props :any) {
        super(props)
        this.state = {
            submitting : false,
            input_type :'text',
            pacLoading :false,
            email :'',
            vcode :'验证码',
            timer_bug :false,
        }
        this.getPac = this.getPac.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    onRegister = (e :any) => {
        const { form , dispatch } = this.props
        form.validateFields((err :any, values :any) => {
            if (!err) {
                Admin.childAdminRegister(values.name,values.email,values.cdkey,values.pac).then(({success ,data ,msg}) => {
                    if(success){
                        dispatch({type:'SET_ADMIN' ,payload : { success , data }})
                    }else{
                        message.error(`注册失败，原因可能是${msg}`)
                    }
                })
            }
        });
    }

    startTimer =() => {
        this.count_down = 60;
        let timer = setInterval(() => {
            if(this.count_down < 0){
                clearInterval(timer);
                this.setState({vcode :`验证码` ,timer_bug :false })
            }else{
                this.setState({vcode :`${this.count_down}s` }) 
                this.count_down--;                     
            }
        } , 1000)
    }

    componentWillReceiveProps(nextProps :any){
        const { AdminReducer } = nextProps
        if(AdminReducer._id){
            location.replace('#/admin')
        }
    }

    getPac = () => {
        if(this.state.email && !this.state.timer_bug){
            this.setState({ timer_bug :true })
            this.startTimer();
            Admin.getEmailPAC(this.state.email).then(({ success ,data ,msg }) => {
                if(success){
                    message.success('验证码已发送，请注意查收')
                }else{
                    message.error(`验证码获取失败，原因可能是${msg}`)
                }
            })  
        }else{
            message.error('用户邮箱不允许为空')
        }
        
    }

    onEmailChange = (e :any) => {
        this.setState({email: e.target.value })
    }

    render (){
        const { getFieldDecorator } = this.props.form;
        const type = 'account'
        return (
            <Form className="login-form">
                <FormItem>
                    {getFieldDecorator('name', {
                    rules: [{
                        required: type === 'account', message: '请输入昵称',
                    }],
                    })(
                    <Input
                        size="large"
                        prefix={<Icon type="user" className={'prefixIcon'} />}
                        placeholder="请输入昵称"
                    />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                    rules: [{
                        required: type === 'account', message: '请输入邮箱',
                    }],
                    })(
                    <Input
                        size="large"
                        prefix={<Icon type="mail" className={'prefixIcon'} />}
                        placeholder="请输入邮箱"
                        onChange = {this.onEmailChange}
                    />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('cdkey', {
                    rules: [{
                        required: type === 'account', message: '请输入激活码',
                    }],
                    })(
                    <Input
                        size="large"
                        prefix={<Icon type="code-o" className={'prefixIcon'} />}
                        placeholder="请输入激活码"
                    />
                    )}
                </FormItem>
                <FormItem>                  
                    <Row gutter={8}>
                        <Col span={18}>
                        {getFieldDecorator('pac', {
                        rules: [{
                            required: type === 'account', message: '请输入验证码',
                        }],
                        })(
                        <Input
                            size="large"
                            prefix={<Icon type="lock" className={'prefixIcon'} />}
                            onFocus={() => { this.setState({input_type :'password'}) }}
                            type={this.state.input_type}
                            placeholder="请输入验证码"
                        />
                        )}
                        </Col>
                        <Col span={6}>
                        <Button disabled={this.state.timer_bug} onClick={this.getPac} >{this.state.vcode}</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem className={'additional'}>
                    <Button size="large" loading={this.state.submitting} className={'submit'} type="primary" onClick={this.onRegister} >
                    { this.state.submitting ? '注册中' : '注册' }
                    </Button>
                </FormItem>
            </Form>
        )
    }

}


import { connect } from 'react-redux'
import { adminLogin } from '../../../redux/Login'
import { bindActionCreators } from 'redux';

export default connect((state :any ) :any => ({
    AdminReducer : state.AdminReducer
}),dispatch => ({
    adminLogin: bindActionCreators(adminLogin, dispatch),
    dispatch :dispatch
}))(Form.create()(RegisterComponent));