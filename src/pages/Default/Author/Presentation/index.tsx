import * as React from 'react';
import { DState } from './constraint'
import './index.css'

class Presentation extends React.Component<any,DState> {

  constructor(props :any){
    super(props);
    this.state = {
      content : ''
    }
  }

  componentWillMount() {
    // console.log(this.props.id ,'id')
    
  }

  render() {
    return (  
      <div>{this.state.content}</div>
    );
  }
}

export default Presentation;
