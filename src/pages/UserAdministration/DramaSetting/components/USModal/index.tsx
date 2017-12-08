import * as React from 'react';
import { Modal ,Input  } from 'antd';
import SeiriBox from '../../../../../comment/seiri'
import Seiri ,{ SeiriRule } from '../../../../../components/Seiri'

interface State {
  visible : boolean,       //model显示
  code : string,                 //左侧未处理文字
  md : string,               //右侧处理代码
  id :string                   //key值。来判断是创建还是修改
}

interface Props {
    visible? : boolean,
    code :string,
    id? :string,
    onSave?(id :string ,code :string) :void,
    onCancel?(id :string ,code :string):void
}

class USModal extends React.Component<Props,State> {
  seiriRule : Array<SeiriRule>;
  constructor(props :Props){
    super(props)
    this.state = {
      visible : props.visible || false,
      code : props.code || '',
      md : '',
      id :props.id || ''
    }
    this.seiriRule = [
      {regexp : /^第\d+集$/ , value :'# ${key}' },
      {regexp : /^\d+[-]\d+[,.:].{0,10}$/ , value :'  \n---  \n## ${key}'},
      {regexp : /^(场景|人物|时间)[-:,.：]/ , value :'`${key}`'   },
    ]
    this.USModalCancel = this.USModalCancel.bind(this);
    this.USModalOk = this.USModalOk.bind(this);
    this.onUSModal = this.onUSModal.bind(this);
    this.seiriChange = this.seiriChange.bind(this)
  }

  componentWillReceiveProps(nextProps :Props){
    let { visible ,code ,id } = nextProps;
    if(visible){
      const seiriBox = new SeiriBox(code)
      const md = seiriBox.setOption({br:true}).addRule(this.seiriRule).getContent()
      visible = visible || false;
      id = id || ''
      this.setState({ visible ,md ,id ,code })
    }else{
      this.setState({ visible :false})
    }
    
  }

  //唤起modal（显示）
  onUSModal = () => {
    this.setState({visible:true})
  }

  // 点击保存时
  USModalOk = () => {
    if(this.props.onSave){
        this.props.onSave(this.state.id,this.state.code)
    }
  }

  //取消
  USModalCancel = () => {
    if(this.props.onCancel){
        this.props.onCancel(this.state.id,this.state.code)
    }
  }

  seiriChange = (inputValue :string,MarkdownCode :string) => {
    this.setState({
        code :inputValue,
        md : MarkdownCode 
    })
  }

  render() {
    return (
        <Modal
            title={this.state.id ? '修改剧集' : '添加剧集'}
            width='50vw'
            visible={this.state.visible}
            onOk={this.USModalOk}
            onCancel={this.USModalCancel}
            okText="保存"
        >
            <Input placeholder={'请输入剧集标题'} />
            <br /><br />
            <Seiri rule={this.seiriRule} onChange={this.seiriChange} value={this.state.code} />
        </Modal>
    );
  }
}


export default USModal

