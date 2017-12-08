import * as React from 'react';
import { Card  } from 'antd';
import './index.css';
import { Topic } from '../../axios'
import { CardTopicsState ,CardTopicsProps } from './constraint'
import { Link } from 'react-router-dom';

class CardTopics extends React.Component<CardTopicsProps, CardTopicsState> {
  constructor(props :any) {
    super(props);
    this.state = {
      topics :[],
      loading :true
    }
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    Topic.getTopics().then(({success ,data}) => {
      if(success && data) {
        this.setState({
          topics: data,
          loading :false
        });
      }
    })
  }

  more(){
    return this.props.more ? <Link to={this.props.more}>More</Link> : <a href="#"></a>
  }

  render() {
    return (
      <Card loading={this.state.loading} className="card_topics theme_CCard" title={this.props.title} extra={this.more()} >
        {
          this.state.topics.map(topic => {
            return (
              <p key={topic.id}><Link to={`/topic/${topic.id}`}>{ topic.title }</Link></p>
            )
          })
        }
      </Card>
    );
  }
}

export default CardTopics;
