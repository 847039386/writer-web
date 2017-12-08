import * as React from 'react';
import { Card ,Avatar ,Row ,Col } from 'antd';
import { User } from '../../axios'
import { ImgRankCardState ,ImgRankCardProps } from './constraint'
import { Link } from 'react-router-dom';
import './index.css'


class ImgRankCard extends React.Component<ImgRankCardProps, ImgRankCardState> {
  constructor(props :any) {
    super(props);
    this.state = {
      Users: [],
      loading :true
    }
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    User.getWelcomeUsers().then(({success ,data}) => {
      if(data && success){
        this.setState({
          Users: data,
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
      <Card loading={this.state.loading} className="img_rank_card theme_CCard" title={this.props.title} extra={this.more()}>
        {
          this.state.Users.map((data,index) => {
            return (
              <Row key={data.id}>
                <Col span={6}><Avatar src={data.avatar} icon="user" /></Col>
                <Col span={18}>
                  <p>{data.name}</p>
                  <p>关注度：{data.follow}</p>
                </Col>
              </Row>
            )
          })
        }
      </Card>
    );
  }
}

export default ImgRankCard;
