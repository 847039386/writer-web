import * as React from 'react';
import { Card ,Button ,Spin ,message } from 'antd';
import Seiri ,{ SeiriRule } from '../../../../components/Seiri'
import { Drama } from '../../../../axios' 
import './style.less'

interface Props {
  id :string
}

interface State {
  characterinput : string,
  md :string,
  loading :boolean
}


class CharacterPage extends React.Component<Props,State> {
  seiriRule : Array<SeiriRule>;
  oldCharacterInput :string;
  constructor(props :any){
    super(props)
    this.seiriRule = [
        { regexp:/^(.{1,5})([\(\[【（].{0,10}[\)）】\]])?[.:：]$/ ,value:'# ${key}' ,key: { name:'renwu' ,exec :1 ,result :'`${key}`' } }
    ]
    this.seiriChange = this.seiriChange.bind(this);
    this.onsubmit = this.onsubmit.bind(this)
    this.state = {
        characterinput : '',
        md :'',
        loading :false
    }
  }

  componentWillMount(){
      this.setState({loading :true})
      Drama.getCharacter(this.props.id).then(({success ,data}) => {
        this.setState({loading :false})
        if(success && data){  
          this.oldCharacterInput = data.character;
          this.setState({characterinput :data.character})
        }
      })
  }
  
  onsubmit(e :any){
    if(this.state.md && this.state.md !== this.oldCharacterInput){
      this.setState({loading :true})
      Drama.setCharacter(this.props.id,this.state.md,'token').then(({success ,data ,msg}) => {
        if(success && data){  
          this.oldCharacterInput = data.character;  
          this.setState({loading :false})
          message.success('修改成功');
        }else{
          this.setState({loading :false})
          message.error(`修改失败，失败原因${msg}`)
        }
      })
    }else{
      message.error(`请修改数据。`)
    }
  }

  seiriChange = (code :string , md :string) => {
    this.setState({characterinput : code ,md :md})
  }
  
  render() {
    return (
        <Spin spinning={this.state.loading}>
          <Card loading={this.state.loading} bodyStyle={{padding:0}} actions={[<Button onClick={this.onsubmit}>提交</Button>]}>
              <Seiri rule={this.seiriRule} onChange={this.seiriChange} value={this.state.characterinput} />
          </Card>
        </Spin>
    );
  }
}

export default CharacterPage
