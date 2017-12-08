import * as React from 'react';
const ReactLoading = require('react-loading').default;


class Loading extends React.Component<any,any> {

  constructor(props :any){
    super(props)
  }

  render() {
    return (
      <div>
        <ReactLoading type={'spinningBubbles'} color={'#ffa39e'} className={'m_auto'}/>   
      </div>
    );
  }
}

export default Loading;
