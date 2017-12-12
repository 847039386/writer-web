import { IUser ,UserModel ,IBook ,ICategory ,BookModel ,CategoryModel } from './'

interface IDrama {
  id     :string,     //id
  user_id :IUser,     //作者
  title  :string,     //标题
  category_id : Array<ICategory>,   //剧情类型
  book_id :IBook  ,  //剧本类型
  create_at :string,   //创建时间
  description :string,  //剧本简单描述
  abstract :string,      //剧本梗概
  character :string,     //人物小传
  weight? :number    //权重，越高越前面
}

class DramaModel {
  id     :string;
  user_id :IUser;
  title  :string;
  category_id : Array<ICategory>;
  book_id :IBook;
  create_at :string;
  description :string;
  abstract : string;
  character :string;
  weight :number;
  constructor(){
    this.id = '';
    this.category_id = [new CategoryModel()]; 
    this.title = '';
    this.book_id = new BookModel();
    this.create_at = "";
    this.description = "";
    this.character = "";
    this.weight = 0;
    this.user_id = new UserModel();
  }
}

export { IDrama ,DramaModel }
