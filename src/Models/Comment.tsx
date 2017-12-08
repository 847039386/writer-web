interface IComment {
  id :string,
  username : string,
  create_at :string,
  content :string
}

class CommentModel implements IComment  {
  id     :string;
  username :string;
  create_at :string;
  content :string;
  constructor(id :string ,username :string ,create_at:string ,content :string){
    this.id = id;
    this.username = username;
    this.create_at = create_at;
    this.content = content;
  }
}


export { IComment ,CommentModel }