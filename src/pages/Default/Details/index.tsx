import * as React from 'react';
import { Col, Row ,Tabs ,Icon ,Button } from 'antd';
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom';
import Comment from '../../../components/Comment';
import { DetailsState, DramaModel ,IEpisode ,EpisodeModel } from './constraint';
import { Drama as DramaAjax , Episodes } from '../../../axios';
import Seiri from '../../../components/Seiri'

class BookDetails extends React.Component<any, DetailsState> {
  
  constructor(props :any) {
    super(props);
    const { UserReducer } = props 
    Comment.defaultProps = { drama :props.match.params.id }
    this.state = {
      dramaBook : new DramaModel(),
      Episode : new EpisodeModel(),
      Episodes : [],
      selectedEpisodeID : '',
      isLogin : UserReducer.token
    }
  }

  componentWillMount() {
    this.getDrama(this.props.match.params.id);
  }

  getDrama = (drama_id :string) => {
    DramaAjax.getDramaByID(drama_id).then(({success ,data}) => {
         if(success && data){
            this.setState({dramaBook :data})
            this.getEpisodes(drama_id)
         }
      })
  }


  getEpisode = (id :string) => {
    this.setState({selectedEpisodeID :id})
    Episodes.getEpisodesByID(id).then(({success ,data}) => {
      if(success && data ){
        this.setState({ Episode : data })
      }
    })
  }

  getEpisodes = (drama_id : string) =>{
    Episodes.getEpisodesByDramaID(drama_id).then(({ success ,data }) => {
      if(success && data){
        this.setState({ Episodes :data })
        console.log(data)
        if(data.length > 0){
          this.getEpisode(data[0].id);
        }
      }
    })
  }


  getMVBodyTabPane(description :string ,character :string ,episode :IEpisode){
    return (
      <Tabs type="card" className="theme_CTabs">
        <TabPane tab="故事梗概" key="1">{description}</TabPane>
        <TabPane tab="人物小传" key="2">
            <Seiri onlyMD value={character} />
        </TabPane>
        <TabPane tab="剧集" key="3">
          <Row>
            <Col span={4}>
              {
                this.state.Episodes.map((episode :any ,idx :number) => {
                  let selected :any = this.state.selectedEpisodeID == episode.id ? {type : "primary"} : {type :'dashed'}
                  return (
                    <Button onClick={() => {this.getEpisode(episode.id)}} style={{marginBottom :10 ,width :'80%' }} key={episode.id} {...selected} >{`${episode.title}`}</Button>
                  )
                })
              }
            </Col>
            <Col span={20}>
              <div style={{marginBottom:10}} key={episode.id}>
                <p>{episode.title}</p>
                <Seiri onlyMD value={episode.content} />
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    )
  }

  render() {
    return (
        <Row gutter={16}>
          <Col md={16} className="details_juben theme_Dborder">
            <Col span={24}><h1 className="theme_DTitle title">{this.state.dramaBook.title}</h1></Col>
            <Col className="introduce theme_DBox" span={24}>
              <Col span={12}><p>作者：<Link to={`/author/presentation/${this.state.dramaBook.user.id}`}>{this.state.dramaBook.user.name}</Link></p></Col>
              <Col span={12}><p>创建于：{this.state.dramaBook.create_at} </p></Col>
              <Col span={12}>作品类型：[{this.state.dramaBook.type.join('/')}]</Col>
              <Col span={12}>阅读量：300</Col>
              <Col span={12}>点赞：<Icon type="like" style={{cursor:'pointer'}} />&nbsp;300</Col>
            </Col>
            <Col className="content" span={24}>{this.getMVBodyTabPane(this.state.dramaBook.description,this.state.dramaBook.character,this.state.Episode)}</Col>
          </Col>
          <Col md={8}>
            <Comment  />
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
