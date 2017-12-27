import * as React from 'react';
import { Input, Button ,Card ,message } from 'antd';
import { Drama } from '../../../../axios' 
const { TextArea } = Input;

interface Props {
  id :string
}

interface State {
  abstractInput : string,
  loading :boolean
}

class AbstractPage extends React.Component<Props,State> {
  oldAbstractInput :string;
  constructor(props :Props){
    super(props)
    this.state = {
      abstractInput : '',
      loading :false
    }
  }

  componentWillMount(){
    this.setState({loading :true})
    Drama.getAbstract(this.props.id).then(({success ,data}) => {
      this.setState({loading :false})
      if(success && data){  
        this.oldAbstractInput = data.abstract;    
        this.setState({abstractInput :data.abstract})
      }
    })
  }
  
  onSave(e :any){
    console.log('保存')
  }
  onSubmit = () => {
    if(this.oldAbstractInput !== this.state.abstractInput){
      this.setState({loading :true})
      Drama.setAbstract(this.props.id,this.state.abstractInput,'token').then(({success ,data ,msg}) => {
        this.setState({loading :false})
        if(success && data){  
          this.oldAbstractInput = data.abstract;  
          message.success('修改成功');
        }else{
          message.error(`修改失败，失败原因${msg}`)
        }
      })
    }else{
      message.error(`请修改数据。`)
    }
  }

  onAbstractInputChange = (e :any) => {
    this.setState({abstractInput : e.target.value})
  }

  
  render() {
    return (
      <div>
        <Card loading={this.state.loading} bodyStyle={{padding:0}} actions={[<Button onClick={this.onSubmit}>提交</Button>]}>
            <TextArea value={this.state.abstractInput} onChange={this.onAbstractInputChange} placeholder="请输入" style={{height :'50vh' ,resize: 'none' ,border:0}} />
        </Card>
      </div>
    );
  }
}


export default AbstractPage

