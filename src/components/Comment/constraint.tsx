import { IComment , CommentModel } from '../../Models'

interface CommentState {
  comments : IComment [],   //评论信息
  user_comment :string,   //用户输入的回复内容
  loginModelVisible :boolean  //登陆框是否显示,
  isLogin : any,   //是否登陆
  sendCommentStatus :boolean     //为了防止添加评论时 服务器相应速度慢。而造成的多条评论BUG。
}

interface CommentProps {
  drama? : any,        
  User? : any 
  onLogin? (username :string ,password:string) : void,
}

export { CommentState ,CommentProps ,IComment ,CommentModel };
