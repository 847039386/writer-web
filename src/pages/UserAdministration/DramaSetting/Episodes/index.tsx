import * as React from 'react';
import { Card ,Button ,Row ,Col ,AutoComplete  } from 'antd';
import UaEpisodes from '../components/UaEpisodes'
import './index.less'
const AOption = AutoComplete.Option;
import { Episodes } from '../../../../axios'
import Bundle from '../../../../bundle'
import USModal from '../components/USModal'

const ReactMarkdown = (props: any) => (
  <Bundle load={() => import('react-markdown')}>
      {(UpdateDrama: any) => <UpdateDrama {...props} />}
  </Bundle>
);

interface episodesAll {
  id :string,
  title :string
}

interface State {
  episodesAll : Array<episodesAll>,      
  markdownCode : string,
  selected :string,
  USModal_visible :boolean,
  USModal_code :string,
  USModal_key :string
}

class EpisodesPage extends React.Component<any,State> {

  constructor(props :any){
    super(props)
    this.state = {
      episodesAll : [],      //所有剧集
      markdownCode : '',
      selected :'',
      USModal_visible :false,
      USModal_code :'',
      USModal_key :'',
    }
    this.onAdd = this.onAdd.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  componentWillMount(){
    Episodes.getEpisodesByDramaID('id').then(({success ,data}) => {
      if(success && data){
        this.setState({episodesAll :data})
      }
    })
    
  }

  // 点击剧集标题触发
  onTitle = (key? :any) :void => {
    Episodes.getEpisodesByID('id').then(({success ,data }) => {
      if(success && data){
        this.setState({markdownCode : data.content ,selected :key})
      }
    })
  }

  //删除数据触发，该参数为索引
  onDelete = (key :any) : void => {
    Episodes.removeEpisodesByID('id').then(({success ,data }) => {
      if(success){
        const { idx } = key
        const episodesAll = this.state.episodesAll
        episodesAll.splice(idx ,1)
        this.setState({episodesAll})
      }
    })
  }

  //修改数据触发，该参数为索引ID
  onUpdate = (key :any) => {
    Episodes.getEpisodesByID('id').then(({success ,data }) => {
      if(success && data){
        this.setState({USModal_code :data.content ,USModal_visible:true ,USModal_key :data.id})
      }
    })
  }

  //添加剧集触发
  onAdd = (event :any) => {
    this.setState({USModal_visible:true ,USModal_code:'',USModal_key:''})
  }

  //保存数据的时候触发
  onSave = (id :string ,code :string) =>{
    this.setState({USModal_visible:false})
    if(id){
      console.log('这是修改'+id+'?')
    }else{
      console.log('这是创建'+id+'?')
      Episodes.saveEpisodes('id',code).then(({success ,data}) => {
        if(success && data){
          this.setState({episodesAll :this.state.episodesAll.concat({ id : data.id ,title :data.title})})
        }
      })
    }
  }

  //取消保存数据时触发
  onCancel = (id :string ,code :string) => {
    this.setState({USModal_visible:false})
  }

  chapterorderDatasoure  = (item : any) :any => {
    return (
      <AOption key={item.id}>{item.title }</AOption>
    )
  }

  render() {
    return (
      <div>
          <div style={{marginBottom:10 ,paddingLeft :2 ,background:'#e6f7ff' ,border:'1px solid #91d5ff' ,padding:15}}>
            选择章节：<AutoComplete dataSource={this.state.episodesAll.map(this.chapterorderDatasoure)} size={'small'} />
            &nbsp;&nbsp;移动到&nbsp;&nbsp;
            <AutoComplete dataSource={[{id:'topchap',title:'--最顶部'}].concat(this.state.episodesAll).map(this.chapterorderDatasoure)} size={'small'} />&nbsp;&nbsp;之后
            &nbsp;&nbsp;<Button size={'small'} type={'danger'} >更改</Button>
          </div>
          <Row gutter={16}>
             <Col span={6}>
                <Card title="剧集" bodyStyle={{overflow:'hidden' ,height:550 ,padding:0}} extra={<Button onClick={this.onAdd} size={"small"}  icon={'plus'} type="danger">添加剧集</Button> }>
                    <ul style={{overflowY:'scroll' ,height:550 ,padding:24 }}>
                      {
                        this.state.episodesAll.map((episodes :any , idx:number) => {
                          return (
                            <li key={episodes.id} style={{ textAlign:'center', padding:'5px 10px' ,listStyle:'none'}}>
                              <UaEpisodes 
                                onSelected={ this.state.selected == episodes.id ? true : false }
                                onTitle={() => { this.onTitle(episodes) }} 
                                onDelete={()=> this.onDelete({idx, episodes}) }
                                onUpdate={() => this.onUpdate({idx ,episodes})}
                                title={`${episodes.title}`} />
                            </li>
                          )
                        })
                      }                     
                    </ul>     
                </Card>
             </Col>
             <Col span={18}>
                <Card title="展示框" bodyStyle={{overflowY:'scroll' ,height:550}}>
                  <div className={"bm-markdown"} >
                    <ReactMarkdown source={this.state.markdownCode} />
                  </div>
                </Card>
             </Col>
          </Row>
          <USModal id={this.state.USModal_key} code={this.state.USModal_code} visible={this.state.USModal_visible} onCancel={this.onCancel} onSave={this.onSave} />
      </div>
    );
  }
}


export default EpisodesPage

