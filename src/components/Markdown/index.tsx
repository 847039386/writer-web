import * as React from 'react';
// import ReactMarkdown from "react-markdown"; 
// import CodeMirror from 'react-codemirror';
import { Button } from 'antd'
import { MarkdrwnState ,MarkdrwnProps } from './constraint'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/markdown/markdown';
import './index.less'
import {Controlled as CodeMirror} from 'react-codemirror2'
import Bundle from '../../bundle';


const ReactMarkdown = (props: any) => (
  <Bundle load={() => import('react-markdown')}>
      {(UpdateDrama: any) => <UpdateDrama {...props} />}
  </Bundle>
);



class Markdown extends React.Component<MarkdrwnProps,MarkdrwnState> {
  welcomeCode :string;
  constructor(props :any){
    super(props)
    this.welcomeCode = [
        '# 北门编辑库\n',
        '欢迎来到北门编辑库，请熟悉markDown文档。 让剧本更有吸引力\n',
        '* 段落\n* 段落 \n  * 段落 \n',
        '> 段落\n\n[图片地址](http://p1.4499.cn/pic/UploadPic/2014-8/23/201408230135482283.jpg)\n\n',
        '![image](http://p1.4499.cn/pic/UploadPic/2014-8/23/201408230135482283.jpg)\n\n`重点`\n\n'
    ].join('')
    this.state = {
      markdownCode : this.welcomeCode,
    }
    this.inputOnChange = this.inputOnChange.bind(this)      //编辑器内容修改触发
    this.onSubmit = this.onSubmit.bind(this)
  }

  inputOnChange = (editor :any, data :any, value :string) => {
    this.setState({markdownCode :value})
  }


  onSubmit(){
    if(!this.state.markdownCode ||  this.state.markdownCode === this.welcomeCode){
      console.log('相等')
    }
    if(this.props.onSubmit){
      this.props.onSubmit(this.state.markdownCode)
    }
  }

  render() {
    return (
        <div className='lzm_markdown' >
          <div className="markdown_tools">
            <Button.Group >
              <Button onClick={this.onSubmit} type="primary">提交</Button>
            </Button.Group>
          </div>
          <div className="editor-pane" >
            <CodeMirror options={{mode:"markdown" ,theme: 'monokai' ,lineWrapping:true }} value={this.state.markdownCode} onBeforeChange={this.inputOnChange} />
          </div>
          <div className="result-pane" >
            <ReactMarkdown source={this.state.markdownCode}/>
          </div>
        </div>
    );
  }
}

// import { connect } from 'react-redux'
export default (Markdown)
