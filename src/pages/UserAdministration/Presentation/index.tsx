import * as React from 'react';
// import { Layout } from 'antd';

class UserPresentationPage extends React.Component<any,any> {

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
import Auth from '../../../components/Auth'
export default connect((state :any) :any => ({ UserReducer :state.UserReducer }))(Auth('user',UserPresentationPage))
