import * as React from 'react';
import { Button ,Spin ,message ,Popconfirm } from 'antd';
import UAHeader from '../../../components/UAHeader';
import { Notify } from '../../../axios';
import { Link } from 'react-router-dom';
import './styles.less'


class NotifyPage extends React.Component<any,any> {
  user_id :string;  
  token : string;
  currentPage :number;
  maxPage :number;
  constructor(props :any){
    
    super(props)
    this.user_id = props.UserReducer._id;
    this.token = props.UserReducer.token;
    this.state = {
        loadding :false,
        more :false,
        datas : []
    }
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentWillMount(){
    this.getNotifys()
  }
  
  onLoadMore(){
    if(this.state.more){
        this.getNotifys(this.currentPage+1);  
    }
  }


  delNotifys = () => {
    Notify.findUserIDAndRemove(this.user_id,this.token).then(({success ,data ,msg}) => {
        if(success){
            message.success(`清空成功`)
            this.setState({datas :[]});
        }else{
            message.error(`清空失败，原因${msg}`)
        }
    })
  }

  getNotifys = (page : number = 1) => {
    this.setState({loadding:true})
    Notify.find(this.user_id,page).then(({success ,pagination ,data ,msg}) => {
        this.setState({loadding:false})
        if(success && data && pagination){
            this.currentPage = pagination.current;
            this.maxPage = Math.ceil(pagination.total / pagination.size);
            this.setState({more : this.currentPage < this.maxPage})
            this.setState({ datas :this.state.datas.concat(data) })
        }
    })
  }

  formatNotify = (datas : any[]) :Array<any> => {
    let new_notify :any = []
    datas.forEach(item => {
        switch(item.type){
            case 1 :
                new_notify.push(<div className={'_nitem'} key={item._id}>{item.content}</div>)
            break;
            case 2 :
                if(item.targetType == 'drama'){
                    switch(item.action){
                        case 'comment':
                            new_notify.push(<div className={'_nitem'} key={item._id}><Link to={`/author/${item.sender._id}`}>{item.sender.name}</Link> <span className={'wgt'}>评论</span>了您的 <Link to={`/details/${item.drama_id._id}`}>{ item.drama_id.title }</Link> 这本剧本<div style={{ padding:10 ,margin :'10px 0' ,background:'#f3f3f3' }}>{item.content}</div></div>)
                        break;
                        case 'like':
                            new_notify.push(<div className={'_nitem'} key={item._id}><Link to={`/author/${item.sender._id}`}>{item.sender.name}</Link> <span className={'wgt'}>喜欢</span>您的 <Link to={`/details/${item.drama_id._id}`}>{ item.drama_id.title }</Link> 这本剧本</div>)
                        break;
                    }
                }else if(item.targetType == 'fans' && item.action == 'follow'){
                    new_notify.push(<div className={'_nitem'} key={item._id}><Link to={`/author/${item.sender._id}`}>{item.sender.name}</Link> <span className={'wgt'}>关注</span>了您</div>)
                }
            break;
        }
    })
    return new_notify
  }

  
  render() {
    return (
      <div>
        <UAHeader data={[{value:'主页'},{value:'我的消息'}]} title="我的消息" />      
        <div className="bm-content" >
            {
                this.state.datas.length > 0 ?
                <Popconfirm title="是否清空所有动态?" placement="right" onConfirm={this.delNotifys} okText="是" cancelText="否">
                    <Button type="primary" style={{ marginBottom:15 }} >清空</Button>
                </Popconfirm> : ''
            }
            <div className={'notify'}>
                { this.formatNotify(this.state.datas).map((item :any) => {
                    return item
                }) }
            </div>
            <div style={{ textAlign:'center' ,marginTop:24 }}>
              {
                  this.state.loading ?
                  <Spin tip={'数据加载中...'} /> :
                  this.state.more ?
                  <Button onClick={this.onLoadMore}>
                      { this.state.more ? '加载更多' : '暂无数据'}
                  </Button> : ''
              }
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import Auth from '../../../components/Auth';
export default connect(state => state)(Auth('user',NotifyPage));

