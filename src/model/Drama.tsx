import { IUser ,UserModel ,IBook ,ICategory ,BookModel ,CategoryModel } from './'

interface IDrama {
  _id     :string,     //id
  user_id :IUser,     //作者
  title  :string,     //标题
  category_id : Array<ICategory>,   //剧情类型
  book_id :IBook  ,  //剧本类型
  create_at :string,   //创建时间
  description :string,  //剧本简单描述
  abstract :string,      //剧本梗概
  character :string,     //人物小传
  weight? :number    //权重，越高越前面
  reading_count : number,     // 总阅读量
  reading_week_count : number,  // 周阅读量
  reading_month_count :number   // 月阅读量
}

class DramaModel {
  _id     :string;
  user_id :IUser;
  title  :string;
  category_id : Array<ICategory>;
  book_id :IBook;
  create_at :string;
  description :string;
  abstract : string;
  character :string;
  weight :number;
  reading_count : number;
  reading_week_count : number;
  reading_month_count :number;
  constructor(){
    this._id = '';
    this.category_id = [new CategoryModel()]; 
    this.title = '';
    this.book_id = new BookModel();
    this.create_at = "";
    this.description = "";
    this.character = "";
    this.weight = 0;
    this.reading_count = 0;
    this.reading_week_count = 0;
    this.reading_week_count = 0;
    this.user_id = new UserModel();
  }
}

export { IDrama ,DramaModel }
