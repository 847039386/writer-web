interface IPresentation {
  id     :string,         //id
  user   : string,       //用户这里只取ID
  create_at :string,      //创建时间
  content :string,   //介绍
}

class PresentationModel {
  id     :string;         
  user : string;       
  create_at :string;      
  content :string;        
  constructor(){
    this.id = 'id';
    this.user = '';
    this.create_at = '';
    this.content = '';
  }
}

export { IPresentation ,PresentationModel }


