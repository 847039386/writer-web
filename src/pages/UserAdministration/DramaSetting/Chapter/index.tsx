import * as React from 'react';
import { Card ,Button ,Row ,Col ,AutoComplete ,message ,Spin ,Popconfirm ,Select  } from 'antd';
import UaEpisodes from '../components/UaEpisodes'
import './index.less'
const AOption = AutoComplete.Option;
import { Chapter } from '../../../../axios'
import Bundle from '../../../../bundle'
import USModal from '../components/USModal'

const ReactMarkdown = (props: any) => (
  <Bundle load={() => import('react-markdown')}>
      {(UpdateDrama: any) => <UpdateDrama {...props} />}
  </Bundle>
);

interface Chapters {
  _id :string,
  title :string
}

interface State {
  chapters : Array<Chapters>,      
  markdownCode : string,
  selected :string,
  USModal_visible :boolean,
  USModal_code :string,
  USModal_key :string,
  USModal_title :string,
  titlesLoading :boolean,
  chapterLoading :boolean,
  order_beginID :string,
  order_endID :string
}

interface Props {
  id :string,
  uid :string,
  token :string
}

class ChapterPage extends React.Component<Props,State> {
  current_ucode :string;
  current_utitle :string;
  isOnOpenUpdate : boolean;
  constructor(props :Props){
    super(props)
    this.state = {
      chapters : [],      //所有剧集
      markdownCode : '',
      selected :'',
      USModal_visible :false,
      USModal_code :'',
      USModal_key :'',
      USModal_title :'',
      titlesLoading :false,
      chapterLoading :false,
      order_beginID :'',
      order_endID:''
    }
    this.onAdd = this.onAdd.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.onChapterBeginOrderChange = this.onChapterBeginOrderChange.bind(this);
    this.onChapterEndOrderChange = this.onChapterEndOrderChange.bind(this);
    this.updateChapterOrder = this.updateChapterOrder.bind(this)
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
  onTitle = (chapter :any) :void => {
    if(!this.state.chapterLoading){
      this.setState({chapterLoading :true})
      Chapter.findById(chapter._id).then(({success ,data }) => {
        this.setState({chapterLoading :false})
        if(success && data){
          this.setState({markdownCode : data.content ,selected :chapter._id})
        }
      })
    }
  }

  //删除数据触发，该参数为索引
  onDelete = (info :any) : void => {
    const { idx , chapter } = info;
    const { _id } = chapter;
    Chapter.findByIdAndRemove(_id,this.props.token,this.props.uid).then(({success ,data ,msg }) => {
      if(success){
        const chapters = this.state.chapters
        chapters.splice(idx ,1)
        this.setState({chapters})
        message.success('删除成功')
      }else{
        message.error(`删除失败，原因可能是：${msg}`)
      }
    })
  }

  //修改数据触发，该参数为索引ID
  onUpdate = (info :any) => {
    const { chapter } = info;
    const { _id } = chapter;
    if(!this.isOnOpenUpdate && _id){
      this.isOnOpenUpdate = true
      message.loading('正在加载数据!',0)
      Chapter.findById(_id).then(({success ,data }) => {
        message.destroy()
        this.isOnOpenUpdate = false;
        if(success && data){
          this.current_ucode = data.content;
          this.current_utitle = data.title
          this.setState({USModal_code :data.content ,USModal_visible:true ,USModal_key :data._id ,USModal_title :data.title})
        }
      })
    }
  }

  //添加剧集触发
  onAdd = (event :any) => {
    this.setState({USModal_visible:true ,USModal_code:'',USModal_key:''})
  }

  //保存数据的时候触发
  onSave = (id :string ,code :string ,title :string) =>{
    this.setState({USModal_visible:false})
    if(id){
      if(code !== this.current_ucode || this.current_utitle !== title){
        Chapter.findByIdAndUpdate(id,title,code,this.props.token,this.props.uid).then(({success ,data  ,msg}) => {
          if(success && data){
            message.success('修改成功')
          }else{
            message.error(`修改失败，原因可能是：${msg}`)
          }
        })
      }
    }else{
      Chapter.save(this.props.id,title,code,this.props.token,this.props.uid).then(({success ,data  ,msg}) => {
        if(success && data){
          this.setState({chapters :this.state.chapters.concat({ _id : data._id ,title :data.title})})
          message.success('创建成功')
        }else{
          message.error(`创建失败，原因可能是：${msg}`)
        }
      })
    }
  }

  //取消保存数据时触发
  onCancel = (id :string ,code :string) => {
    this.setState({USModal_visible:false})
  }

  chapterorderDatasoure  = (chapter : any) :any => {
    return (
      <AOption key={chapter._id}>{chapter.title }</AOption>
    )
  }

  onChapterBeginOrderChange = (value :any) => {
    this.setState({order_beginID : value})
  }
  onChapterEndOrderChange = (value :any) => {
    this.setState({order_endID :value})
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
          <Row gutter={16}>
             <Col span={6}>
                <Card loading={this.state.titlesLoading} title="剧集" bodyStyle={{overflow:'hidden' ,height:550 ,padding:0}} extra={<Button onClick={this.onAdd} size={"small"}  icon={'plus'} type="danger">添加剧集</Button> }>
                    <ul style={{overflowY:'scroll' ,height:550 ,padding:24 }}>
                      {
                        this.state.chapters.map((chapter :any , idx:number) => {
                          return (
                            <li key={chapter._id} style={{ textAlign:'center', padding:'5px 10px' ,listStyle:'none'}}>
                              <UaEpisodes 
                                onSelected={ this.state.selected == chapter.id ? true : false }
                                onTitle={() => { this.onTitle(chapter) }} 
                                onDelete={()=> this.onDelete({idx, chapter}) }
                                onUpdate={() => this.onUpdate({idx ,chapter})}
                                title={`${chapter.title}`} />
                            </li>
                          )
                        })
                      }                     
                    </ul>     
                </Card>
             </Col>
             <Col span={18}>
                <Card loading={this.state.chapterLoading} title="展示框" bodyStyle={{overflowY:'scroll' ,height:550}}>
                  <div className={"bm-markdown"} >
                    <ReactMarkdown source={this.state.markdownCode} />
                  </div>
                </Card>
             </Col>
          </Row>
          <USModal title={this.state.USModal_title} id={this.state.USModal_key} code={this.state.USModal_code} visible={this.state.USModal_visible} onCancel={this.onCancel} onSave={this.onSave} />
      </div>
    );
  }
}


export default ChapterPage

