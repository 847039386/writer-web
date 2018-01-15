import * as React from 'react';
import Config from '../../../../../conf'
import { Button } from 'antd';
// import { Row ,Button ,Col ,Icon ,Input ,Badge } from 'antd';
// import { User } from '../../../../../axios'

interface State {
    identifier :string;
}

interface Props {
    uid :string,
    identifier? :string,
}

class QQBindPage extends React.Component<Props,State> {
 
  constructor(props :Props){
    super(props);
    this.state = {
        identifier : props.identifier || ''
    }
    
  }

  componentWillMount(){
     
  }
  
  componentWillReceiveProps(nextProps :Props){
    const { identifier } = nextProps;
    this.setState({identifier :identifier || ''})
 }
  
  render() {
    const { uid } = this.props 
    const stateOption = {
        platform :'qq',
        type :'bind' ,
        uid :uid,
        referer :location.hash
    }
    const stateOptionString = encodeURIComponent(JSON.stringify(stateOption));
    return (
        <div style={{ width :500 ,margin:'0 auto'}}>
            {
                this.state.identifier ?
                    <p style={{color:'#80848f' ,margin:'5px 0 15px' ,paddingLeft:20 ,fontSize:14}}><span style={{color:'red'}}>*&nbsp;&nbsp;</span>QQ已绑定，暂时不能解绑</p>
                : <div>
                    <p style={{color:'#80848f' ,margin:'5px 0 15px' ,paddingLeft:20 ,fontSize:14}}><span style={{color:'red'}}>*&nbsp;&nbsp;</span>登陆QQ后将直接绑定，请慎重考虑。</p>
                    <Button style={{}} type={'primary'} href={`${Config.OAuth.qq.baseSite}?response_type=${'code'}&client_id=${Config.OAuth.qq.appID}&state=${stateOptionString}&redirect_uri=${Config.OAuth.qq.redirectURL}`}>
                        绑定
                    </Button>
                </div>
            }
        </div>
    )
  }
}

export default QQBindPage

