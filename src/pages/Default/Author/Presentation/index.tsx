import * as React from 'react';
import { User as UserAjax } from '../../../../axios';
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
    console.log(this.props.id ,'id')
    UserAjax.getPresentationByUserID(this.props.id).then(({ success ,data }) => {
      if(success && data){
        this.setState({content :data.content})
      }
    })
  }

  render() {
    return (  
      <div>{this.state.content}</div>
    );
  }
}

export default Presentation;
