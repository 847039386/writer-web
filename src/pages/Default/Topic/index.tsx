import * as React from 'react';
import { Col, Row  } from 'antd';
import { Topic } from '../../../axios'
import { ITopic ,TopicModel } from '../../../Models'

interface State {
    topic :ITopic
}

class BookDetails extends React.Component<any, State> {
  
  constructor(props :any) {
    super(props);
    this.state = {
      topic : new TopicModel()
    }
  }

  componentWillMount() {
    Topic.getTopicById(this.props.match.params.id).then(({success ,data}) => {
        if(data && success){
            this.setState({ topic :data })
        }
    })
  }


  render() {
    return (
        <Row >
          <Col md={24} className="details_juben theme_Dborder">
            <Col span={24}><h1 className="theme_DTitle title">{this.state.topic.title}</h1></Col>
            <Col className="introduce theme_DBox" span={24}>
              <Col span={24}><p>作者：admin</p></Col>
              <Col span={24}><p>创建于：{this.state.topic.create_at}</p></Col>
            </Col>
            <Col className="content" span={24}>
            {this.state.topic.content} 
            </Col>
          </Col>
        </Row>
    );
  }
}

import { connect } from 'react-redux'
const mapStateToPorps = (state :any) => {
    return { ...state };
};
export default connect(mapStateToPorps)(BookDetails);
