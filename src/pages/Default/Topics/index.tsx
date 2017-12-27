import * as React from 'react';
import { List ,Pagination } from 'antd';
import { Topic } from '../../../axios'
import { Link } from 'react-router-dom'

class TopicsPage extends React.Component<any, any> {
  constructor(props :any) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      topics : [],
      topicsLoading : false, 
      pagination :{ current :1 , onChange :this.onPageChange ,total : 0}
    };    
  }

  componentWillMount() {
    this.getTopics();
  }

  onPageChange = (page :number) => {
    this.getTopics(page)
  }

  getTopics = (page :number = 1 ,count :number = 10) => {
    this.setState({topicsLoading :true})
    Topic.getDatas(page,count).then(({success ,data ,pagination}) => {
      this.setState({topicsLoading :false})
      if(success && data && pagination) {
        this.setState({ topics:data ,pagination :{total :pagination.total ,current :pagination.current }  })
      }
    })
  }

  getList = () => {
    return (
      <List
        loading={this.state.topicsLoading}
        size="small"
        header={ <Pagination current={this.state.pagination.current} total={this.state.pagination.total} onChange={this.onPageChange} />}
        dataSource={this.state.topics}
        renderItem={(topic :any) => (
          <List.Item  extra={''}>
            <List.Item.Meta
              avatar={''}
              title={<Link to={`/topic/${topic._id}`}>{topic.title}</Link>}
            />
            {topic.create_at}
          </List.Item>
        )}
      />
    )
  }
  

  render() {
    return (
      <div style={{background:'#fff'}} className={'p16'}>
        {this.getList()}
      </div>
      
    );
  }
}

export default TopicsPage;
