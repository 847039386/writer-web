import * as React from 'react';
import { Card ,Collapse } from 'antd';
import { Drama } from '../../axios'
import { RankCardState ,RankCardProps } from './constraint';
import { IUser } from '../../Models'
import './index.css';
import { Link } from 'react-router-dom';
const { Panel } = Collapse;



class RankCard extends React.Component<RankCardProps, RankCardState> {
  defaultKey : string;
  constructor(props :any) {
    super(props);
    this.state = {
      dramaBooks: [],
      loading :true,
      defaultKey :''
    }
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    Drama.getDramas().then(({success ,data}) => {
      if(success && data){
        this.setState({
          dramaBooks: data,
          loading :false,
          defaultKey : data[0].id
        });
      }
    })
  }

  getPanelContent(id :string ,types: any[] ,user :IUser ,create_at :string ,description :string) {
    return (
      <div className="panel_content">
        <p>作者：<Link to={`/author/presentation/${user.id}`} >{user.name}</Link></p>
        <p>类型：[{types.join('/')}]</p>
        <p>时间：{create_at}</p>
        <p>简介：{description}</p>
        <p><Link to={`/details/${id}`}>查看详情</Link></p>
      </div>
    )
  }
  getPanelHeader(index :number ,title :string){
    let color = '#000';
    switch(index){
      case 0:
        color = '#ed3f14'
      break;
      case 1:
        color ='#2d8cf0'
      break;
      case 2:
        color = '#19be6b'
      break;
    }
    return (
      <p><span style={{color :color, fontSize: 16, fontWeight:'bold'}}>{index+1}</span>.&nbsp;{title}</p>
    )
  }

  more(){
    return this.props.more ? <Link to={this.props.more}>More</Link> : <a href="#"></a>
  }

  render() {
    return (
      <Card loading={this.state.loading} title={this.props.title} extra={this.more()} style={{ padding:5 }} className="rank_card theme_CCard">
        <Collapse className="theme_CCollapse" accordion bordered={false} defaultActiveKey={[this.state.defaultKey]}>
          {
            this.state.dramaBooks.map((data,index) => {
              return (
                <Panel header={this.getPanelHeader(index,data.title)} key={data.id} style={{ overflow: 'hidden'}} >
                  {this.getPanelContent(data.id,data.type ,data.user ,data.create_at ,data.description)}
                </Panel>
              );
            })
          }
        </Collapse>
      </Card>
    );
  }
}

export default RankCard;
