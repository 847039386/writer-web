import * as React from 'react';
import { Col, Row ,Tabs ,Spin ,Card ,message ,Tag ,Affix ,Select ,Button } from 'antd';
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom';
import Comment from '../../../components/Comment';
import { DetailsState, DramaModel ,IChapter ,ChapterModel } from './constraint';
import { Drama as DramaAjax , Chapter ,DramaLike } from '../../../axios';
import Seiri from '../../../components/Seiri';

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
      episodeLoading :false,
      isLike :false,
      likeLoading :false
    }
    this.onChapterSearch = this.onChapterSearch.bind(this)
    this.addLike = this.addLike.bind(this);

  }

  componentWillMount() {
    this.getDrama(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps :any) {
    const { UserReducer ,match } = nextProps
    if(UserReducer.token){
      this.setState({ isLogin :UserReducer.token })
      this.isLike(match.params.id,UserReducer);
    }
    
  }

  getDrama = (drama_id :string) => {
    this.setState({mainLoading :true})
    DramaAjax.getDramaByID(drama_id).then(({success ,data}) => {
         this.setState({mainLoading :false})
         if(success && data){
            const { UserReducer } = this.props;
            this.isLike(drama_id,UserReducer)
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
    Chapter.findByDramaID(drama_id).then(({ success ,data }) => {
      if(success && data){
        this.setState({ Chapters :data })
        if(data.length > 0){
          this.getEpisode(data[0]._id);
        }
      }
    })
  }


  onChapterSearch = (value :any) => {
    if(value && value != 'all'){
      this.getEpisode(value)
    }
  }

  isLike = (drama_id :string,user :any) => {
    if(drama_id && user._id){
      this.setState({likeLoading:true})
      DramaLike.isLike(drama_id,user._id).then(({success ,data}) => {
        this.setState({likeLoading:false})
        if(success){
          if(data){
            this.setState({isLike :true})
          }else{
            this.setState({isLike :false})
          }
        }
      })
    }
  }

  addLike = () => {
    const { UserReducer ,match } = this.props;
    if(UserReducer._id && match.params.id){
      this.setState({likeLoading:true})
      DramaLike.addLike(match.params.id,UserReducer._id,UserReducer.token).then(({ success ,data}) => {
        this.setState({likeLoading:false})
        if(success){
          this.setState({isLike :true})
        }
      })
    }
  }



  getMVBodyTabPane(description :string ,character :string ,chapter :IChapter){
    const { Chapters ,episodeLoading } = this.state;
    return (
      <Tabs type="card" className="theme_CTabs">
        <TabPane tab="故事梗概" key="1">{description}</TabPane>
        <TabPane tab="人物小传" key="2">
            <Seiri onlyMD value={character} />
        </TabPane>
        <TabPane tab="剧集" key="3">
            <Affix offsetTop={20}>
              <Select defaultValue="all" style={{ width: 220 }} onChange={this.onChapterSearch}>
                    <Select.Option key={'all'} value={'all'} disabled >请选择剧集</Select.Option>
                    {
                      Chapters.map((chapter :IChapter ,idx :number) => {
                        return (
                          <Select.Option key={chapter._id} value={chapter._id}>{chapter.title}</Select.Option>
                        )
                      })
                    }
              </Select>
            </Affix>
            <div>
              {
                episodeLoading ?
                this.loadingDOM :
                <div style={{marginBottom:10}} key={chapter._id}>
                  <h1>{chapter.title}</h1>
                  <Seiri onlyMD value={chapter.content} />
                </div>
              }
            </div>
        </TabPane>
      </Tabs>
    )
  }

  getResultDOM = () :React.ReactNode =>{
    const { dramaBook ,mainLoading ,Chapter } = this.state; 
    return (
        <Card loading={mainLoading} bodyStyle={{minHeight :'80vh',padding:24}}>
          <Col span={24} style={{textAlign:'center'}}>
            <h1 style={{display:'inline' ,marginRight:20}} className="theme_DTitle title">{dramaBook.title}</h1>
            {
              this.state.isLogin && !this.state.likeLoading ?
                this.state.isLike? <Button disabled type={'dashed'} icon={'like'} size={'small'}>已赞</Button> :
                <Button disabled={this.state.isLike} onClick={this.addLike} size={'small'} type={'primary'} style={{ background:'#FF6F27' ,borderColor:'#FF6F27'}} icon={'like-o'}>赞</Button>
              : ''
            }
          </Col>
          <Col className="introduce theme_DBox" span={24}>
              {
                dramaBook.user_id ?
                <Col span={12}>作者：<Link to={`/author/${dramaBook.user_id._id}`}>{dramaBook.user_id.name}</Link></Col>
                : ''
              }
              <Col span={12}>创建于：{dramaBook.create_at}</Col>
              <Col span={12}>剧情类型：&nbsp;{
                dramaBook.category_id.length > 0 ?
                dramaBook.category_id.map((category ,item) => {
                  return (<Tag color="purple" key={category._id}>{category.name}</Tag>)
                }) : <Tag color="purple" key={'defa'}>{'其他'}</Tag>
              }</Col>
              <Col span={12}>剧本类型：<Tag color="#f50">{dramaBook.book_id.name}</Tag></Col>
              <Col span={12}>阅读量：{dramaBook.reading_count || 0}</Col>
              <Col span={12}>赞：{dramaBook.like_count || 0} </Col>
          </Col>
          <Col className="content" span={24}>{this.getMVBodyTabPane(dramaBook.abstract || dramaBook.description,dramaBook.character,Chapter)}</Col>
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
export default connect(state => state)(BookDetails);
