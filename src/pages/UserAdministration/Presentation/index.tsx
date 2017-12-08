import * as React from 'react';
// import { Layout } from 'antd';

class UserAdministrationLayout extends React.Component<any,any> {

  constructor(props :any){
    super(props)
  }

  componentWillReceiveProps(nextProps :any){
    
  }

  

  render() {
    return (
        <h1 >
            hellow  user pressshsshshshhdhdhdhhdhdhdhdhdhdh
        </h1>
    );
  }
}

import { connect } from 'react-redux'
export default connect(state => state)(UserAdministrationLayout)
