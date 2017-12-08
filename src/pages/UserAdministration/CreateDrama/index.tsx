import * as React from 'react'
import { Form, Input, Button ,Switch ,Select } from 'antd';
import UAHeader from '../../../components/UAHeader'
const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;

class FormLayoutDemo extends React.Component<any,any> {
  constructor(props :any) {
    super(props);
    this.state = {
      projectShow : false
    }
    this.ProjectVisibilityOnChange = this.ProjectVisibilityOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

 
  ProjectVisibilityOnChange(checked :boolean){
    this.setState({projectShow :checked})
  }

  onSubmit(){
    location.replace("#/ua/drama/setting/id");
  }

  render() {
  
    return (
        <div>
          <UAHeader data={[{value:'剧本管理'},{value:'创建剧本'}]} title="创建剧本" description="设置剧本的一些基本信息。" />
          <div className="bm-content">
            <Form style={{ padding: 24, background: '#fff' , minHeight: 720 }} layout='horizontal' onSubmit={this.onSubmit}>
              <FormItem label="剧本名称" labelCol={{span :4}} wrapperCol={{span:14}}>
                <Input placeholder="请输入..." />
              </FormItem>
              <FormItem label="剧本类型" labelCol={{span :4}} wrapperCol={{ span: 14 }}>
                <Select defaultValue={'mv'} >
                  <Option key="mv" >电影</Option>
                  <Option key="xiju" >电视剧</Option>
                </Select>
              </FormItem>
              <FormItem label="访问" labelCol={{span :4}} wrapperCol={{span:14}} extra="私有模式仅允许持有密钥者才可访问." >
                <Switch onChange={this.ProjectVisibilityOnChange} checkedChildren="私有" unCheckedChildren="公有"  />
                <div style={{ display:`${this.state.projectShow ? 'block' : 'none'}` }}><Input name="props" style={{margin:'5px 0'}} placeholder="请输入密钥"  /></div>
              </FormItem>
              <FormItem label="剧情类型" labelCol={{span :4}} wrapperCol={{ span: 14 }}>
                <Select mode="multiple" placeholder="点击选择剧本类型" defaultValue={['xuanyi', 'xiju']} >
                  <Option key="xuanyi" >悬疑</Option>
                  <Option key="xiju" >喜剧</Option>
                </Select>
              </FormItem>
              <FormItem label="剧本描述" labelCol={{span :4}} wrapperCol={{ span: 14 }}>
                <TextArea placeholder={'简短的剧本描述'} autosize={{ minRows: 6, maxRows: 6 }} />
              </FormItem>
              <FormItem  wrapperCol={{ span: 14, offset: 4 }}>
                <Button type="primary" onClick={this.onSubmit}>创建</Button>
              </FormItem>
            </Form>
          </div>
        </div>
    );
  }
}

// export default Form.create()(FormLayoutDemo)

import { connect } from 'react-redux'
export default connect()(Form.create()(FormLayoutDemo))