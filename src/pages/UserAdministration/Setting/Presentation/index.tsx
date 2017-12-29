import * as React from 'react';
import UAHeader from '../../../../components/UAHeader'
import { Card ,Button ,Spin ,message } from 'antd';
import { User } from '../../../../axios'
import Seiri from '../../../../components/Seiri'

class UserSettingPresentationPage extends React.Component<any,any> {
  oldPresentation :String;
  constructor(props :any){
    super(props)
    this.state = {
      loading :false,
      presentationInput : '',
      md :''
    }
    this.seiriChange = this.seiriChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount(){
    this.getPresentation()
  }

  getPresentation = () =>{
    this.setState({loading :true})
    const { UserReducer } = this.props;
    User.getPresentation(UserReducer._id).then(({ success ,data ,msg }) => {
      this.setState({loading :false})
      if(success && data){
        this.oldPresentation = data.presentation || '';
        this.setState({presentationInput : data.presentation || ''});
      }
    })
  }

  setPresentation = () =>{
    if(this.oldPresentation !== this.state.presentationInput){
      this.setState({loading :true})
      const { UserReducer } = this.props;
      User.setPresentation(UserReducer._id,this.state.presentationInput,'token').then(({ success ,data ,msg }) => {
        this.setState({loading :false})
        if(success && data){
          this.setState({presentationInput : data.presentation || ''})
          this.oldPresentation = data.presentation
          message.success('修改成功')
        }else{
          message.error(`修改错误,原因可能是${msg}`)
        }
      })
    }else{
      message.error('不允许提交重复的值')
    }
    
  }

  seiriChange = (code :string , md :string) => {
    this.setState({presentationInput : code ,md :md})
  }

  onSubmit = () => {
    this.setPresentation();
  }

  render() {
    return (
        <div>
          <UAHeader data={[{value:'用户简介'}]} title="设置用户简介" description={'设置用户简介支持markdown'} />      
          <div className="bm-content" >
            <Spin spinning={this.state.loading}>
              <Card loading={this.state.loading} bodyStyle={{padding:0}} actions={[<Button disabled={this.state.loading} onClick={this.onSubmit}>提交</Button>]}>
                  <Seiri onChange={this.seiriChange} value={this.state.presentationInput} />
              </Card>
            </Spin>
          </div>
        </div>
    );
  }
}

import { connect } from 'react-redux'
import Auth from '../../../../components/Auth'
export default connect((state :any) :any => ({ UserReducer :state.UserReducer }))(Auth('user',UserSettingPresentationPage))
