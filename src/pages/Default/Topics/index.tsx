import * as React from 'react';
import { List ,Pagination } from 'antd';
import { Topic } from '../../../axios'

class TopicsPage extends React.Component<any, any> {
  constructor(props :any) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      topics : [],
      pagination :{ current :1 , onChange :this.onPageChange ,total : 0}
    };
    console.log(this.state.pagination)
    
  }

  componentWillMount() {
    this.getTopics();
  }

  onPageChange = (page :number) => {
    this.getTopics(page)
  }

  getTopics = (page :number = 1 ,count :number = 10) => {
    Topic.getTopics(page,count).then(({success ,data ,pagination}) => {
      if(success && data && pagination) {
        this.setState({ topics:data ,pagination :{total :pagination.total ,current :pagination.current }  })
      }
    })
  }

  getList = () => {
    return (
      <List
        size="small"
        header={ <Pagination current={this.state.pagination.current} total={this.state.pagination.total} onChange={this.onPageChange} />}
        dataSource={this.state.topics}
        renderItem={(topic :any) => (
          <List.Item  extra={''}>
            <List.Item.Meta
              avatar={''}
              title={topic.title}
              description="随机的描述"
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
