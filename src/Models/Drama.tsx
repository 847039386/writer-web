import { IUser ,UserModel } from './'

interface IDrama {
  id     :string,     //id
  user :IUser,     //作者
  title  :string,     //标题
  type   :string [],  //剧本类型
  create_at :string,   //创建时间
  description :string,  //剧本简单描述
  abstract :string,      //剧本梗概
  character :string,     //人物小传
  weight? :number    //权重，越高越前面
}

class DramaModel {
  id     :string;
  user :IUser;
  title  :string;
  type   :string [];
  create_at :string;
  description :string;
  abstract : string;
  character :string;
  weight :number;
  constructor(){
    this.id = '';
    this.title = '';
    this.type = [];
    this.create_at = "";
    this.description = "";
    this.character = "";
    this.weight = 0;
    this.user = new UserModel();
  }
}

export { IDrama ,DramaModel }
