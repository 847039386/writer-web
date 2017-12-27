import * as React from 'react';
import UAHeader from '../../../components/UAHeader';
import { User } from '../../../axios'
import { Form ,Input ,Button } from 'antd';
const FormItem = Form.Item;
class Home extends React.Component<any,any> {
    count_down :number;
    constructor(props :any){
        super(props);
        this.state = {
            vcode : '获取验证码',
            timer_bug : true,
        }
        this.sendVCode = this.sendVCode.bind(this);
        this.updatePassword = this.updatePassword.bind(this)
    }


    setConutDown = () =>{
        this.setState({ })
    }

    vCodeTimer = () => {
        if(this.state.timer_bug){
                this.startTimer();
                this.setState({timer_bug :false})
                User.getEmailPAC('token').then(({success ,data}) => {
                    if(success && data){
                                               
                    }
                })               
        }
    }

    startTimer =() => {
        this.count_down = 60;
        let timer = setInterval(() => {
            if(this.count_down < 0){
                clearInterval(timer);
                this.setState({vcode :`获取验证码` ,timer_bug :true })
            }else{
                this.setState({vcode :`${this.count_down}s后可继续获取验证码，请注意查收。` }) 
                this.count_down--;                     
            }
        } , 1000)
    }

    sendVCode = () => {
        this.vCodeTimer()
    }

    updatePassword = () => {
        this.props.form.validateFieldsAndScroll((err :any, values :any) => {
            if (!err) {
                location.replace("#/admin/success/pass");
            }
        });
    }



    render (){
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <UAHeader data={[{value:'主页'},{value:'个人设置'},{value:'修改密码'}]} title="修改密码" />      
                <div className="bm-content" style={{background:'#fff'}} >
                    <div className="p16" style={{minHeight:650}} >
                        <Form style={{ margin :'24px 0'}}>
                            <FormItem label="验证码：" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
                                {
                                    getFieldDecorator('pac_email',{
                                        rules: [{
                                            required: true,  whitespace:true ,message: '验证码不能为空！',
                                        }],
                                    })(<Input placeholder="将带着您的验证码发送一封邮件。"  size="large" />)
                                }                               
                                <Button disabled={!this.state.timer_bug} onClick={this.sendVCode}>{this.state.vcode}</Button>
                            </FormItem>
                            <FormItem label="新密码：" labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
                                {
                                    getFieldDecorator('password',{
                                        rules: [{
                                            required: true, whitespace:true , message: '新密码不能为空！',
                                        },{
                                            min: 10, message: '密码长度不能小于10！',
                                        }],
                                    })(<Input placeholder="请输入新的密码" size="large" />)
                                }                                  
                            </FormItem>
                            <FormItem wrapperCol={{ span: 10, offset: 7  }}>
                                <Button onClick={this.updatePassword} type={'primary'}>提交</Button>
                            </FormItem>
                        </Form>
                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Form.create()(Home)
