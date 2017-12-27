import * as React from 'react';
import { CommentState ,CommentProps ,ICommentPopulate } from './constraint';
import { Input ,Button ,Modal ,Spin ,List ,Avatar ,message} from 'antd';
import LoginComponent from '../Login'
import './index.less';
import { Comment as CommentAjax } from '../../axios'
import { connect } from 'react-redux'
import { onLogin } from '../../redux/Login'
import { bindActionCreators } from 'redux';
import moment from '../../common/moment-cn'

class Comment extends React.Component<CommentProps, CommentState> {
  loadingDOM :React.ReactNode = <Spin style={{ width :'100%' }} tip="加载中..." />;
  constructor(props :CommentProps) {
    super(props);
    const { User } = props
    this.setComment = this.setComment.bind(this)
    this.onChangeComment = this.onChangeComment.bind(this)
    this.toggleLoginModel = this.toggleLoginModel.bind(this)
    this.state = {
      comments :[],
      user_comment :'',
      loginModelVisible : false,
      isLogin : User ? User.token : false,
      sendCommentStatus : true,
      loading :false,
      pagination : { current : 1 ,total :0 ,size :10 },
      notCs : false,
      user_avatar : User.avatar || ''
    }
    LoginComponent.defaultProps = {
      success : this.toggleLoginModel.bind(this)
    }
  }

  componentWillMount() {
    this.getComments(this.props.drama);
  }

  componentWillReceiveProps(nextProps :any){
    const { User } = nextProps
    if(User.token){
      this.setState({isLogin :true ,user_avatar :User.avatar})
    }
  }

  //获取评论 
  getComments(dramaID :string ,page : number = 1) {
    this.setState({loading :true})
    CommentAjax.findByDramaID(dramaID,page).then(({success ,data ,pagination}) => {
      this.setState({loading :false})
      if(success && data && pagination){
        let max = Math.ceil(pagination.total/pagination.size)
        if(pagination.current >= max){
          this.setState({notCs :true})
        }
        this.setState({
          comments: data.concat(this.state.comments),
          pagination :pagination
        });
      }
    })
  }

  onPageChange = () => {
    let max = Math.ceil(this.state.pagination.total/this.state.pagination.size)
    if(this.state.pagination.current < max){
      this.getComments(this.props.drama,++this.state.pagination.current)
    }
  }

  //用户发送评论到服务器
  setComment = (e :any) => {
    message.config({ top :50 })
    if(this.state.user_comment && this.props.User._id && this.props.User.token){
      if(this.state.sendCommentStatus){
        this.setState({sendCommentStatus: false })
        CommentAjax.send(this.props.User._id,this.props.drama,this.state.user_comment,this.props.User.token).then(({ success ,data }) => {
          this.setState({sendCommentStatus: true })
          if(success && data){
            let comment :ICommentPopulate = {
              _id :data._id,
              user_id : this.props.User,
              create_at : moment(data.create_at).endOf('minute').fromNow(),
              content : data.content
            }
            let news_comments  = this.state.comments
            news_comments.unshift(comment)
            this.setState({
              comments :news_comments,
              user_comment :''
            })
            message.success('评论成功!',1)
          }else{
            message.error('服务器报错',1)
          }
        })
      }
    }else{
      message.error('评论内容不能为空,请检查.',1)
    }
  }

  //用户填写评论
  onChangeComment = (e :any) => {
    this.setState({user_comment :e.target.value})
  }

  // 显示login 组件
  toggleLoginModel = () => {
    this.setState({ loginModelVisible :!this.state.loginModelVisible })
  }

  render() {
    return (
      <div className="lzm_comment">
        <Modal className="loginModel" width={300} visible={this.state.loginModelVisible} onCancel={() => {this.toggleLoginModel()}} >
          <div style={{margin: '10px 0'}}>
            <LoginComponent />
          </div>
        </Modal>
        <div style={{ display :'flex' ,alignItems:'center' }}>
            <div style={{marginRight:5 ,height:40,width:40}}><Avatar src={ this.state.user_avatar } shape="square" size="large" icon="user" /></div>
            <div style={{ flex :1  }} >
                {
                  this.state.isLogin ? 
                  <Input style={{width:'100%'  }} placeholder="添加评论,回车发送" value={this.state.user_comment} disabled={!this.state.sendCommentStatus} onChange={this.onChangeComment} onPressEnter={this.setComment} />
                  : <Button size={'small'} onClick={this.toggleLoginModel} type="primary">登陆</Button>
                }           
            </div>
        </div>
        <List
          loading={this.state.loading}
          header={<div>评论列表&nbsp;&nbsp;{ this.state.notCs || this.state.comments.length <= 0 ? '' : <a onClick={this.onPageChange}>下一页</a> }</div>}
          dataSource={this.state.comments}
          renderItem={(item : ICommentPopulate) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.user_id.avatar} />}
                title={`${item.user_id.name }  ${item.create_at}`}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

import { IReducer } from '../../redux'
export default connect((state :IReducer ,ownProps) : any => ({
  User :state.UserReducer 
})  ,dispatch => ({
  onLogin: bindActionCreators(onLogin, dispatch)
}))(Comment);
