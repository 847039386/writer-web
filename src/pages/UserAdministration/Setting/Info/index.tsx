import * as React from 'react';
import { Form, Input, Button  } from 'antd';
import UAHeader from '../../../../components/UAHeader'
const FormItem = Form.Item;

class UserSettingInfoPage extends React.Component<any,any> {

  constructor(props :any){
    super(props)
    this.onsubmit = this.onsubmit.bind(this)
  }

  componentWillMount(){
    
  }
  
  onsubmit(e :any){

  }

  
  render() {
    return (
      <div>
        <UAHeader data={[{value:'设置'}]} title="设置" />      
        <div className="bm-content" >
          <Form style={{ padding: 24, background: '#fff' , minHeight: 720 }} layout='horizontal'>
              <FormItem label="请输入邮件" labelCol={{span :4}} wrapperCol={{span:14}}>
                <Input placeholder="请输入..." />
              </FormItem>
              <FormItem label="请输入姓名" labelCol={{span :4}} wrapperCol={{span:14}}>
                <Input placeholder="请输入..." />
              </FormItem>
              <FormItem  wrapperCol={{ span: 14, offset: 4 }}>
                <Button type="primary" >创建</Button>
              </FormItem>
            </Form>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux'
import Auth from '../../../../components/Auth'
export default connect((state :any) :any => ({ UserReducer :state.UserReducer }))(Auth('user',UserSettingInfoPage))

