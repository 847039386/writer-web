// import { IDrama } from './'
interface IUser {
  id :string,     //id
  name : string,  //姓名
  token : string,
  follow :number,   //点赞数
  avatar :string,   //头像
  presentation : string,   //他的简介，这里是objectID
  drama : string[] //他的剧本，这里是objectID数组
}

class UserModel {
  id :string;
  name : string;
  token :string;
  follow :number;
  avatar :string;
  presentation :string;
  drama :string[];
  constructor(){
    
  }
}

export { IUser ,UserModel }