import * as React from 'react';
import { CommentState ,CommentProps ,CommentModel } from './constraint';
import { Input ,notification ,Icon ,Button ,Modal } from 'antd';
import LoginComponent from '../Login'
import './index.less';
import { Comment as CommentAjax } from '../../axios'
import { connect } from 'react-redux'
import { onLogin } from '../../redux/Login'
import { bindActionCreators } from 'redux';

class Comment extends React.Component<CommentProps, CommentState> {
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
      sendCommentStatus : true
    }
    LoginComponent.defaultProps = {
      success : this.loginSuccess.bind(this)
    }
  }

  loginSuccess(){
    this.toggleLoginModel();
  }


  componentWillMount() {
    this.getComments(this.props.drama ,1);
  }

  componentWillReceiveProps(nextProps :any){
    const { User } = nextProps
    if(User.token){
      this.setState({isLogin :true})
    }
  }

  //获取评论 
  getComments(dramaID :string ,page : number) {
    CommentAjax.getCommentsByDramaID(dramaID,page).then(({success ,data}) => {
      if(success && data){
        this.setState({
          comments: data,
        });
      }
    })
  }

  //生成每条评论
  getCommentItem(id :string ,username :string ,create_at :string ,content :string){
    return (
      <div key={id} className="lzm_comment_item">
         <div className="lzm_comment_img">
            <img src="http://img4.sycdn.imooc.com/594db6910001c96301000100-40-40.jpg" />
         </div>
         <div className="comment_body">
            <p className="comment_head">
              <span className="username">{username}</span>
              <span className="commenttime">{create_at}</span>
            </p>
            <p className="comment_content">
              {content}
            </p>
         </div>
      </div>
    )
  }

  //用户发送评论到服务器
  setComment = (e :any) => {
    let errorInfo = (description :string) =>{
      notification.open({
        message: '错误',
        description: description,
        icon: <Icon type="close-circle" style={{ color: '#F4364C' }} />,
      });
    } 
    if(this.state.user_comment){
      if(this.state.sendCommentStatus){
        this.setState({sendCommentStatus: false })
        CommentAjax.setCommentByUserToken('token').then(({ success ,data }) => {
          this.setState({sendCommentStatus: true })
          if(success && data){
            let comment :CommentModel = new CommentModel(data.id,data.username,data.create_at,data.content);
            let news_comments  = this.state.comments
            news_comments.unshift(comment)
            this.setState({comments :news_comments})
            this.setState({user_comment :''})
          }else{
            errorInfo('服务器报错')
          }
        })
      }
    }else{
      errorInfo('评论内容不能为空,请检查.');
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
        <div className="lzm_comment_item">
         <div className="lzm_comment_img">
            <img src="http://img4.sycdn.imooc.com/594db6910001c96301000100-40-40.jpg" />
         </div>
         <div className="comment_body">
            <p className="comment_input">             
              {
                this.state.isLogin ? 
                <Input placeholder="添加评论,回车发送" value={this.state.user_comment} disabled={!this.state.sendCommentStatus} onChange={this.onChangeComment} onPressEnter={this.setComment} />
                : <Button onClick={this.toggleLoginModel} type="primary">登陆</Button>  
              }
            </p>
         </div>
      </div>
        {
          this.state.comments.map((comment) => {
            return (
              this.getCommentItem(comment.id,comment.username,comment.create_at,comment.content)
            )
          })
        }
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
