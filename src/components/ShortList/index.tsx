import * as React from 'react';
import { List ,Avatar } from 'antd';
import { IUser , IDrama ,ITopic } from '../../model'
import { Link } from 'react-router-dom';

type dateType = 'author' | 'drama' | 'topic';

interface Props {
    type? : dateType,
    data :any,
}
interface State {
  dataType : dateType
}

class ShortList extends React.PureComponent<Props, State> {
  constructor(props :Props) {
    super(props);
    this.state = {
      dataType : props.type || 'drama',
    }
  }

  getDramaDOM = () :React.ReactNode => {
      let data :Array<IDrama> = this.props.data;
      return (
        <List size="small" dataSource={data}
            renderItem={
              (item :IDrama) => (
                <List.Item>
                  <Link to={`/details/${item._id}`}>{item.title}</Link>
                </List.Item>
              )
            }
        />
      )
  }

  getAuthorDOM = () :React.ReactNode => {
    let data :Array<IUser> = this.props.data;
    return (
      <List size="small" dataSource={data}
          renderItem={
            (item :IUser) => (                             
                <List.Item><List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<Link to={`/author/${item._id}`}>{item.name}</Link>}
                  description={`关注：${item.follow}`}
                /></List.Item>
              
            )
          }
      />
    )
  }
  
  getTopicDOM = () :React.ReactNode => {
    let data :Array<ITopic> = this.props.data;
    return (
      <List size="small" dataSource={data}
          renderItem={
            (item :ITopic) => (     
                <List.Item>
                  <Link to={`/topic/${item._id}`}>{item.title}</Link>
                </List.Item>
            )
          }
      />
    )
  }

  getResultDOM = () :React.ReactNode => {
    const { dataType } = this.state
    if(dataType === 'drama'){
      return this.getDramaDOM();
    }else if(dataType === 'author'){
      return this.getAuthorDOM();
    }else if(dataType === 'topic'){
      return this.getTopicDOM();
    }
    return <p>出错啦！</p>
  }


  render() {
    return this.getResultDOM();
  }
}

export default ShortList;
