import * as React from 'react'
import { Form, Input, Button  ,Select ,message } from 'antd';
import UAHeader from '../../../components/UAHeader';
import { Category ,Book ,Drama } from '../../../axios'
const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;

interface State {
  projectShow :boolean;
  categorys :Array<any>,
  books : Array<any>,
  error :boolean,
}

class UserCreateDramaPage extends React.Component<any,State> {
  constructor(props :any) {
    super(props);
    this.state = {
      projectShow : false,
      categorys :[],
      books :[],
      error:false,
    }
    this.ProjectVisibilityOnChange = this.ProjectVisibilityOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount(){
    this.getCategoryAndBook()
  }

  getCategoryAndBook = () => {
    Promise.all([Category.find(1,999),Book.find(1,999)]).then((result :any) => {
      if(result[0].success && result[1].success){
        let categorys = result[0].data;
        let books =  result[1].data;   
        this.setState({ categorys ,books })
      }else{
        this.setState({error : true})
      }   
    }).catch((err :any) => {
       this.setState({error : true})
    })
  }
 
  ProjectVisibilityOnChange(checked :boolean){
    this.setState({projectShow :checked})
  }

  onSubmit(){
    this.props.form.validateFields((err :any, values :any) => {
      if (!err) {
        if(this.props.UserReducer._id && this.props.UserReducer.token){
          Drama.create(this.props.UserReducer._id,values.dramaName,values.book,values.categorys,values.description || '',this.props.UserReducer.token)
          .then(({success ,data ,msg}) => {
              if(success && data ){
                this.props.history.push({
                  pathname: '/ua/rs',
                  search :`?status=success&type=cdrama&id=${data._id}`
                })
              }else{
                message.error(`创建剧本失败，失败原因${msg}`)
              }
          })
        }else{
    
        }
      }
    });
    
  }

// 以下功能暂且保留 等待上线
// <FormItem label="访问" labelCol={{span :4}} wrapperCol={{span:14}} extra="私有模式仅允许持有密钥者才可访问." >
//   <Switch onChange={this.ProjectVisibilityOnChange} checkedChildren="私有" unCheckedChildren="公有"  />
//   <div style={{ display:`${this.state.projectShow ? 'block' : 'none'}` }}><Input name="props" style={{margin:'5px 0'}} placeholder="请输入密钥"  /></div>
// </FormItem>


  getFormDom = () :React.ReactNode => {
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <UAHeader data={[{value:'剧本管理'},{value:'创建剧本'}]} title="创建剧本" description="设置剧本的一些基本信息。" />
          <div className="bm-content">
            <Form style={{ padding: 24, background: '#fff' , minHeight: 720 }} layout='horizontal' onSubmit={this.onSubmit}>
              <FormItem label="剧本名称" labelCol={{span :4}} wrapperCol={{span:14}}>
                {getFieldDecorator('dramaName', {
                  rules: [{ required: true, message: '请输入剧本名称' },{ min: 1, max:10 , message: '剧本名称长度应在1-10之间' }],
                })(
                  <Input placeholder="请输入剧本名称" />
                )}
              </FormItem>
              <FormItem label="剧本类型" labelCol={{span :4}} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('book', {
                  rules: [{ required: true, message: '剧本类型不允许为空' }],
                })(
                  <Select  placeholder="点击选择剧本类型" >
                    {
                      this.state.books.map((book) => {
                        return (<Option key={book._id} >{book.name}</Option> )
                      })
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem label="剧情类型" labelCol={{span :4}} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('categorys', {
                  rules: [{ required: true, message: '剧情类型不允许为空' }],
                })(
                  <Select mode="multiple" placeholder="点击选择剧情类型"  >
                    {
                      this.state.categorys.map(item => {
                        return (<Option key={item._id} >{item.name}</Option>)
                      })
                    }
                  </Select>
                )}
                
              </FormItem>
              <FormItem label="剧本描述" labelCol={{span :4}} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('description', {})(
                  <TextArea placeholder={'简短的剧本描述'} autosize={{ minRows: 6, maxRows: 6 }} />
                )}
              </FormItem>
              <FormItem  wrapperCol={{ span: 14, offset: 4 }}>
                <Button type="primary" onClick={this.onSubmit}>创建</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      );
  }

  render() {
    return this.state.error ? '' : this.getFormDom()
  }
}


import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect((state :any) :any => ({ UserReducer :state.UserReducer }))(Auth('user',Form.create()(UserCreateDramaPage)))
