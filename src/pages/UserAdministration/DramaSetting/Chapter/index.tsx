import * as React from 'react';
import { Card ,Button ,AutoComplete ,message ,Spin  ,Select ,Popconfirm ,Divider ,Input ,Badge } from 'antd';
import { Chapter } from '../../../../axios'
import './index.less'
const AOption = AutoComplete.Option;
import Seiri from '../../../../components/Seiri'



interface Chapters {
  _id :string,
  title :string,
  isNEW? :boolean
}

interface State {
  chapters : Array<Chapters>,      
  markdownCode : string,    // 用户修改时候的剧集内容
  new_markdownCode :string,   //用户新增时候的剧集内容
  selected :string,
  titlesLoading :boolean,
  chapterLoading :boolean,
  order_beginID :string,
  order_endID :string,

  current_chapterID : string,   // 当前操作剧集的id
  current_chapterIDX : number,  //当前操作剧集的索引
  current_chapterTitle :string, // 当前操作剧集的标题
  chapter_Operation :string   // 剧集操作类型
  new_chapterTitle :string  // 新创建的剧集title
}

interface Props {
  id :string,
  uid :string,
  token :string
}

class ChapterPage extends React.Component<Props,State> {
  current_chapter_old_title :string;
  current_chapter_old_content :string;
  isOnOpenUpdate : boolean;
  constructor(props :Props){
    super(props)
    this.state = {
      chapters : [],      //所有剧集
      markdownCode : '',
      new_markdownCode :'',
      selected :'',
      titlesLoading :false,
      chapterLoading :false,
      order_beginID :'',
      order_endID:'',
      current_chapterID :'',
      current_chapterIDX : 0,
      current_chapterTitle :'',
      chapter_Operation :'',
      new_chapterTitle :''
    }

    this.onChapterBeginOrderChange = this.onChapterBeginOrderChange.bind(this);
    this.onChapterEndOrderChange = this.onChapterEndOrderChange.bind(this);
    this.updateChapterOrder = this.updateChapterOrder.bind(this);
    this.onUpdateSeiriChange = this.onUpdateSeiriChange.bind(this);
    this.onCurrentChapterTitleChange = this.onCurrentChapterTitleChange.bind(this);
    this.updateChapter = this.updateChapter.bind(this);
    this.onNewChapterTitleChange = this.onNewChapterTitleChange.bind(this);
    this.addChapter = this.addChapter.bind(this)
  }

  componentWillMount(){
    this.getChapters();
  }

  getChapters = (page :number = 1 ,pageSize :number = 10) => {
    this.setState({titlesLoading :true ,order_beginID:'' ,order_endID :''})
    Chapter.findByDramaID(this.props.id).then(({success ,data ,msg}) => {
      this.setState({titlesLoading :false})
      if(success && data){
        this.setState({chapters :data})
      }
    })
  }



  // 点击剧集标题触发
  searchChapterStatus = (id :string ,idx:number) :void => {
    this.setState({ current_chapterID :id ,current_chapterIDX :idx})
    if(!this.state.chapterLoading){
      this.setState({chapterLoading :true})
      Chapter.findById(id).then(({success ,data }) => {
        this.setState({chapterLoading :false})
        if(success && data){
          this.current_chapter_old_title = data.title;
          this.current_chapter_old_content = data.content;
          this.setState({markdownCode : data.content ,selected :id , current_chapterTitle :data.title })
        }
      })
    }
  }

  updateChapterStatus = () => {
    this.setState({ chapter_Operation :'update'})
  }

  addChapterStatus = () => {
    this.setState({ chapter_Operation :'add' ,current_chapterID :'ADDJEY'}) //这里先模拟个ID
  }

  chapterorderDatasoure  = (chapter : any) :any => {
    return (
      <AOption key={chapter._id}>{chapter.title }</AOption>
    )
  }

  onCurrentChapterTitleChange = (e :any) => {
    this.setState({ current_chapterTitle : e.target.value})
  }

  onNewChapterTitleChange = (e :any) => {
    this.setState({ new_chapterTitle : e.target.value})
  }

  onChapterBeginOrderChange = (value :any) => {
    this.setState({order_beginID : value})
  }
  onChapterEndOrderChange = (value :any) => {
    this.setState({order_endID :value})
  }

  onUpdateSeiriChange = (code :string ,md :string) => {
    this.setState({ markdownCode :code ,new_markdownCode :md });
  }

  onAddSeiriChange = (code :string ,md :string) => {
    this.setState({ markdownCode :code ,new_markdownCode :md });
  }

  updateChapter = () => {
      const { current_chapterTitle ,current_chapterID ,new_markdownCode } = this.state;
      const { uid ,token } = this.props;
      if(this.current_chapter_old_content != new_markdownCode || this.current_chapter_old_title != current_chapterTitle ){
          this.setState({ chapterLoading :true })
          Chapter.findByIdAndUpdate(current_chapterID,current_chapterTitle,new_markdownCode,token,uid).then(({success ,data ,msg}) => {
              this.setState({ chapterLoading :false })
              if(success && data){
                this.current_chapter_old_title = data.title;
                this.current_chapter_old_content = data.content;
                this.setState({ chapter_Operation :'' ,markdownCode :new_markdownCode })
                message.success('修改成功');
              }else{
                message.error(`修改失败，原因可能是：${msg}`);
              }
          })
      }else{
        message.error('不允许提交重复值');
      }
  }

  addChapter = () => {
    const { new_chapterTitle ,new_markdownCode ,chapters } = this.state;
    const { id ,token ,uid } = this.props
    if(new_chapterTitle && new_markdownCode){
      this.setState({ chapterLoading :true })
      Chapter.save(id,new_chapterTitle,new_markdownCode,token,uid).then(({success ,data ,msg}) => {
        this.setState({ chapterLoading :false })
        if(success && data){
          this.setState({ chapter_Operation :'' ,new_chapterTitle :'' ,new_markdownCode :'' ,current_chapterID :'' ,chapters: chapters.concat({_id : data._id ,title :data.title ,isNEW :true})})
          message.success('创建成功');
        }else{
          message.error(`创建失败，原因可能是：${msg}`);
        }
      })
    }else{
      message.error('标题与内容不能为空');
    }
  }

  removeChapter = () : void => {
    const { chapters ,current_chapterID ,current_chapterIDX } = this.state;
    const { token ,uid } = this.props;
    this.setState({ chapterLoading :true })
    Chapter.findByIdAndRemove(current_chapterID,token,uid).then(({success ,data ,msg }) => {
      this.setState({ chapterLoading :false })
      if(success){
        chapters.splice(current_chapterIDX ,1)
        this.setState({ chapters ,current_chapterID :'' ,current_chapterIDX :0})
        message.success('删除成功')
      }else{
        message.error(`删除失败，原因可能是：${msg}`)
      }
    })
  }

  updateChapterOrder = () => {
    if(this.state.order_beginID && this.state.order_endID && this.state.order_beginID != this.state.order_endID){
      this.setState({titlesLoading :true})
      Chapter.updateChapterOrder(this.state.order_beginID,this.state.order_endID,this.props.token,this.props.uid).then(({success ,data ,msg}) => {
        this.setState({titlesLoading :false})
        if(success){
          message.success(`移动成功`)
          this.getChapters();
        }else{
          message.error(`移动失败，原因可能是：${msg}`)
        }
      })
    }else{
      message.error(`1. 左侧右侧均为必填项   2. 不能是相同的剧集`)
    }
  }

  rollback = () => {
    this.setState({ current_chapterID : '' , chapter_Operation :'' , current_chapterIDX :0})
  }

  getChapterOperationDOM = () :React.ReactNode => {
    const { chapterLoading } = this.state;
    return (
      <div>
        {
          chapterLoading ? <div style={{textAlign:'center'}}><Spin tip={'加载中...'} /></div> :
          <div>
            <div>
              { this.getChapterOperationTypeDOM() }
            </div>
          </div>
        }
      </div>
    )
  }

  
  getChapterOperationTypeDOM = ():React.ReactNode => {
    const { chapter_Operation ,markdownCode ,current_chapterTitle ,new_chapterTitle } = this.state
    if(chapter_Operation === 'update'){
      return (
        <div>
          <Input  addonBefore="标题：" value={current_chapterTitle} onChange={this.onCurrentChapterTitleChange} />
          <Divider dashed />
          <Seiri ruleType={'chapter'} onChange={this.onUpdateSeiriChange} value={markdownCode} />
        </div>
      )
    }else if(chapter_Operation === 'add'){
      return (
        <div>
          <Input  addonBefore="标题：" value={new_chapterTitle} onChange={this.onNewChapterTitleChange} />
          <Divider dashed />
          <Seiri ruleType={'chapter'} onChange={this.onAddSeiriChange} value={markdownCode} />
        </div>
      )
    } else {
      return <Seiri onlyMD value={markdownCode} />
    }
  }

  getDramaOperationDOM = () :React.ReactNode =>{
    const { chapters } = this.state;
    return (
      <div>
              <p>点击下列标签进行操作</p>
              <Button type={'primary'} icon={'plus'} style={{ margin:10 }} onClick={() => { this.addChapterStatus() }} >添加</Button>
              {chapters.map((chapter,idx) => {
                return (
                  <Popconfirm okText={'查看'} cancelText={'取消'} title={'对剧集进行操作'} key={chapter._id} onConfirm={() => { this.searchChapterStatus(chapter._id,idx) }}>
                    {
                      chapter.isNEW ?
                      <Button style={{ margin:10 }}><Badge status="success" text={chapter.title}></Badge> </Button>:
                      <Button style={{ margin:10 }}>{chapter.title}</Button>
                    }
                    
                  </Popconfirm>
                )
              })}
      </div>
    )
  }

  getChapterOperationTypeButtonDOM = () =>{
    const { chapter_Operation } = this.state;
    if(chapter_Operation === 'update'){
      return (
        <span>
          <Button icon={'edit'} style={{margin:'0px 10px 10px'}} onClick={this.updateChapter}>提交修改</Button>
        </span>
      )
    }else if(chapter_Operation === 'add'){
      return (
        <span>
          <Button icon={'save'} style={{margin:'0px 10px 10px'}} onClick={this.addChapter}>保存</Button>
        </span>
      )
    }else{
      return (
        <span>
          <Button icon={'edit'} style={{margin:'0px 10px 10px'}} onClick={() => { this.updateChapterStatus() }}>修改</Button>
          <Popconfirm title="是否删除？" okText="是" cancelText="否" onConfirm={() => { this.removeChapter() }} >
            <Button icon={'delete'} >删除</Button>
          </Popconfirm>
        </span>
      )
    }
  }

  getResultOperationDOM = () :React.ReactNode => {
      const { current_chapterID ,titlesLoading ,chapterLoading } = this.state;
      return (
        <Card loading={titlesLoading} title={
          current_chapterID && !chapterLoading ?
            <div style={{ height :32}}>
              <Button icon={'rollback'} onClick={() =>{ this.rollback() }}>返回</Button>
               { this.getChapterOperationTypeButtonDOM() }      
            </div> : '展示框'
        }>
            { current_chapterID ? this.getChapterOperationDOM() : this.getDramaOperationDOM() }
        </Card>
      )
  }


  render() {
    return (
      <div>
          <Spin spinning={this.state.titlesLoading}>
            <div style={{marginBottom:10 ,paddingLeft :2 ,background:'#e6f7ff' ,border:'1px solid #91d5ff' ,padding:15}}>
              <span>选择章节：</span>
              <Select notFoundContent={'暂无分集内容'} value={this.state.order_beginID} size={'small'} style={{ width: 200 , marginLeft:8}} onSelect={this.onChapterBeginOrderChange}>
                {
                  this.state.chapters.map((chapter) => {
                    return (
                      <Select.Option key={chapter._id}>{chapter.title }</Select.Option>
                    )
                  })
                }
              </Select>
              <span style={{marginLeft:8}}>移动到</span>
              <Select value={this.state.order_endID} size={'small'} style={{ width: 200 ,marginLeft:8 }} onSelect={this.onChapterEndOrderChange}>
                <Select.Option key={'top'}>---最顶部---</Select.Option>
                {
                  this.state.chapters.map((chapter) => {
                    return (
                      <Select.Option key={chapter._id}>{chapter.title }</Select.Option>
                    )
                  })
                }
              </Select>
              <Popconfirm title={'确认更改？'} okText={'是'} cancelText={'否'} onConfirm={this.updateChapterOrder}>
                <Button style={{marginLeft:8}} size={'small'} type={'danger'} >更改</Button>
              </Popconfirm>
              <Button style={{marginLeft:8}} onClick={() => { this.getChapters() }} size={'small'} type={'danger'} >刷新</Button>
            </div>
          </Spin>
          {this.getResultOperationDOM()}
      </div>
    );
  }
}


export default ChapterPage

