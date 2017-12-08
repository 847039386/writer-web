import * as React from 'react';
import { Button } from 'antd';
import UAHeader from '../../../components/UAHeader'


class UserHome extends React.Component<any,any> {

  constructor(props :any){
    super(props)
    this.onsubmit = this.onsubmit.bind(this)
  }

  componentWillMount(){
    
  }
  
  onsubmit(e :any){

  }

  
  render() {
    return (
      <div>
        <UAHeader data={[{value:'主页'}]} title="主页" description="快速的管理" />      
        <div className="bm-content" >
          <Button onClick={this.onsubmit}>切换主题</Button>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux'
export default connect()(UserHome)

