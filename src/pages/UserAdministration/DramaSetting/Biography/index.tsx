import * as React from 'react';
import { Card ,Button ,Spin } from 'antd';
import Seiri ,{ SeiriRule } from '../../../../components/Seiri'
import { Drama } from '../../../../axios' 
import './style.less'

interface Props {
  id :string
}


class Biography extends React.Component<Props,any> {
  seiriRule : Array<SeiriRule>;
  constructor(props :any){
    super(props)
    this.seiriRule = [
        { regexp:/^(.{1,5})([\(\[【（].{0,10}[\)）】\]])?[.:：]$/ ,value:'# ${key}' ,key: { name:'renwu' ,exec :1 ,result :'`${key}`' } }
    ]
    this.seiriChange = this.seiriChange.bind(this);
    this.onsubmit = this.onsubmit.bind(this)
    this.state = {
        input : '',
        md :'',
        loading :false
    }
  }

  componentWillMount(){
      this.setState({loading :true})
      Drama.getDramaByID(this.props.id).then(({success ,data}) => {
        this.setState({loading :false})
        if(success && data){  
          this.setState({input :data.character})
        }
      })
  }
  
  onsubmit(e :any){
    console.log(this.state.md,this.state.md.length ,this.state.input.length)
  }

  seiriChange = (code :string , md :string) => {
    this.setState({input : code ,md :md})
  }
  
  render() {
    return (
        <Spin spinning={this.state.loading}>
          <Card bodyStyle={{padding:0}} actions={[<Button onClick={this.onsubmit}>提交</Button>]}>
              <Seiri rule={this.seiriRule} onChange={this.seiriChange} value={this.state.input} />
          </Card>
        </Spin>
    );
  }
}

export default Biography
