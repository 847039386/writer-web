import { IComment , CommentModel ,ICommentPopulate ,IUser } from '../../model'

interface Pagination {
  total : number,
  current :number,
  size : number
}

interface CommentState {
  comments : ICommentPopulate [],   //评论信息
  user_comment :string,   //用户输入的回复内容
  loginModelVisible :boolean  //登陆框是否显示,
  isLogin : any,   //是否登陆
  sendCommentStatus :boolean,     //为了防止添加评论时 服务器相应速度慢。而造成的多条评论BUG。
  loading :boolean, //评论列表是否正在加载中
  pagination :Pagination,
  notCs : boolean, //是否有后续的评论
  user_avatar :string
}

interface CommentProps {
  drama? : any,        
  User? : any 
  onLogin? (username :string ,password:string) : void,
}

export { CommentState ,CommentProps ,IComment ,CommentModel ,ICommentPopulate ,IUser };
