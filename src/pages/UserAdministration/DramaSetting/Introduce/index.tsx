import * as React from 'react';
import { Input, Button ,Card } from 'antd';
const { TextArea } = Input;


class introduce extends React.Component<any,any> {

  constructor(props :any){
    super(props)
  }

  componentWillMount(){
  }
  
  onSave(e :any){
    console.log('保存')
  }
  onSubmit = () => {

  }

  
  render() {
    return (
      <div>
        
        <Card title="剧情简介" bodyStyle={{padding:0}} actions={[<Button onClick={this.onSubmit}>提交</Button>]}>
            <TextArea placeholder="请输入" style={{height :'50vh' ,resize: 'none' ,border:0}} />
        </Card>
      </div>
    );
  }
}


export default introduce

