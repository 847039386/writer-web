import * as React from 'react';
import { Col, Row ,Tabs ,Icon ,Button ,Spin ,Card ,message } from 'antd';
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom';
import Comment from '../../../components/Comment';
import { DetailsState, DramaModel ,IChapter ,ChapterModel } from './constraint';
import { Drama as DramaAjax , Chapter } from '../../../axios';
import Seiri from '../../../components/Seiri'

class BookDetails extends React.Component<any, DetailsState> {
  loadingDOM :React.ReactNode = <Spin style={{ width :'100%' }} tip="加载中..." />;
  constructor(props :any) {
    super(props);
    const { UserReducer } = props 
    Comment.defaultProps = { drama :props.match.params.id }
    this.state = {
      dramaBook : new DramaModel(),
      Chapter : new ChapterModel(),
      Chapters : [],
      selectedEpisodeID : '',
      isLogin : UserReducer.token,
      mainLoading : false,
      episodeLoading :false
    }
  }

  componentWillMount() {
    this.getDrama(this.props.match.params.id);
  }

  getDrama = (drama_id :string) => {
    this.setState({mainLoading :true})
    DramaAjax.getDramaByID(drama_id).then(({success ,data}) => {
         this.setState({mainLoading :false})
         if(success && data){
            this.setState({dramaBook :data})
            this.getEpisodes(drama_id)
         }
      })
  }


  getEpisode = (id :string) => {
    if(!this.state.episodeLoading){
      this.setState({selectedEpisodeID :id ,episodeLoading :true})
      Chapter.findById(id).then(({success ,data}) => {
        this.setState({episodeLoading :false})
        if(success && data ){
          this.setState({ Chapter : data })
        }
      })
    }else{
      message.loading('正在加载数据...')
    }
  }

  getEpisodes = (drama_id : string) =>{
    Chapter.getDataByDramaID(drama_id).then(({ success ,data }) => {
      if(success && data){
        this.setState({ Chapters :data })
        if(data.length > 0){
          this.getEpisode(data[0].id);
        }
      }
    })
  }


  getMVBodyTabPane(description :string ,character :string ,chapter :IChapter){
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
                this.state.Chapters.map((item :any ,idx :number) => {
                  let selected :any = this.state.selectedEpisodeID == item.id ? {type : "primary"} : {type :'dashed'}
                  return (
                    <Button onClick={() => {this.getEpisode(item.id)}} style={{marginBottom :10 ,width :'80%' }} key={item.id} {...selected} >{`${item.title}`}</Button>
                  )
                })
              }
            </Col>
            <Col span={20}>
              {
                this.state.episodeLoading ?
                this.loadingDOM :
                <div style={{marginBottom:10}} key={chapter.id}>
                  <h1>{chapter.title}</h1>
                  <Seiri onlyMD value={chapter.content} />
                </div>
              }
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    )
  }

  getResultDOM = () :React.ReactNode =>{
    return (
        <Card loading={this.state.mainLoading} bodyStyle={{minHeight :'80vh',padding:24}}>
          <Col span={24}><h1 className="theme_DTitle title">{this.state.dramaBook.title}</h1></Col>
          <Col className="introduce theme_DBox" span={24}>
              <Col span={12}>作者：<Link to={`/author/presentation/${this.state.dramaBook.user_id.id}`}>{this.state.dramaBook.user_id.name}</Link></Col>
              <Col span={12}>创建于：{this.state.dramaBook.create_at}</Col>
              <Col span={12}>作品类型：[&nbsp;{this.state.dramaBook.category_id.map((category ,item) => {
                return (<span key={category.id}>{category.name} &nbsp;</span>)
              })}]</Col>
              <Col span={12}>剧本类型：{this.state.dramaBook.book_id.name}</Col>
              <Col span={12}>阅读量：300</Col>
              <Col span={12}>点赞：<Icon type="like" style={{cursor:'pointer'}} />&nbsp;300</Col>
          </Col>
          <Col className="content" span={24}>{this.getMVBodyTabPane(this.state.dramaBook.description,this.state.dramaBook.character,this.state.Chapter)}</Col>
        </Card>
    )
  }


  render() {
    return (
        <Row gutter={16}>
          <Col md={16} className="details_juben theme_Dborder">
            {this.getResultDOM() }
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
