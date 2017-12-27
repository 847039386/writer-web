interface IComment {
  _id :string,
  user_id : string,
  create_at :string,
  content :string
}

interface IUT {
  _id : string,
  name :string,
  avatar :string
}

interface ICommentPopulate {
  _id :string,
  user_id : IUT,
  create_at :string,
  content :string
}

class CommentModel implements IComment  {
  _id     :string;
  user_id :string;
  create_at :string;
  content :string;
  constructor(id :string ,user_id :string ,create_at:string ,content :string){
    this._id = id;
    this.user_id = user_id;
    this.create_at = create_at;
    this.content = content;
  }
}


export { IComment ,CommentModel ,ICommentPopulate }