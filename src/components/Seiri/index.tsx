import * as React from 'react'
import { Input ,Row ,Col } from 'antd';
const { TextArea } = Input;
import Bundle from '../../bundle';
import './index.less'
import SeiriBox,{ Rule as SeiriRule } from '../../common/seiri'
const ReactMarkdown = (props: any) => (
  <Bundle load={() => import('react-markdown')}>
      {(UpdateDrama: any) => <UpdateDrama {...props} />}
  </Bundle>
);

type SEIRI_RULE_TYPE = 'chapter' | 'character'; 

interface Props {
   height? : string;
   rule? : Array<SeiriRule>;
   value? :string;
   ruleType? :SEIRI_RULE_TYPE;
   onChange?(code :string ,md :string) :void;
   onlyMD? : boolean
}

interface State {
  value :string,
  markdownCode :string
}

class DramaFormat extends React.Component<Props,State> {
  constructor(props :Props) {
    super(props);
    const { value ,onlyMD } = props
    if(value){  
      if(onlyMD){
        this.state = {
          value : value,
          markdownCode : value
        }
      } else {
        this.state = {
          value : value,
          markdownCode : this.getMarkdown(value)
        }
      }
    } else {
      this.state = {
        value :'',
        markdownCode :''
      }
    }
    this.pastingText = this.pastingText.bind(this)
  }

  componentWillReceiveProps(nextProps :Props){
    let { value } = nextProps;
    if(value){
      this.setState({value :value ,markdownCode: this.getMarkdown(value)})
    }else{
      this.setState({value :'' ,markdownCode: ''})
    }    
  }

  getMarkdown = (value :string = '') :string => {
    const { ruleType } = this.props
    const seiriBox = new SeiriBox(value)
    seiriBox.addRule(this.props.rule || []).setOption({trim:true ,br :true ,type :ruleType || ''})
    return seiriBox.getContent();
  }
  
  
  pastingText = (e :any) =>{
      let inputValue = e.target.value
      let markdownCode : string = inputValue
      markdownCode = this.getMarkdown(inputValue)
      this.setState({
        value : inputValue,
        markdownCode : markdownCode
      })
      if(this.props.onChange){
        this.props.onChange(inputValue,markdownCode)
      }
  }

  render() {
    return (
      <div>
        {
          this.props.onlyMD ? 
          <div className={"seiri_md bm-markdown"}><ReactMarkdown source={this.state.markdownCode}/></div> : 
          <Row gutter={16} style={{margin:'5px 0'}}>
            <Col span={12}>
              <div style={{ background :'#f5222d' ,textAlign:'center' ,color:'#fff' , padding:'10px 0' }}>粘贴框</div>
              <TextArea style={{border:'none' ,height :this.props.height || '50vh' ,resize: 'none'}} onChange={this.pastingText} value={this.state.value} placeholder="请粘贴" autosize={false}  />
            </Col>
            <Col className={"seiri_md"} span={12} >
              <div style={{ background :'#fa8c16' ,textAlign:'center' ,color:'#fff' , padding:'10px 0' }}>展示框</div>
              <div className={'bm-markdown'} style={{height :this.props.height || '50vh',overflowY:'scroll' ,cursor:' not-allowed' }}>
                <ReactMarkdown source={this.state.markdownCode}/>
              </div> 
            </Col>
          </Row>}
      </div>
    );
  }
}


export default DramaFormat
export { SeiriRule }