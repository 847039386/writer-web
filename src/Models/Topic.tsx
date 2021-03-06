interface ITopic {
    id     :string,     //id
    create_at :string,  //创建时间
    title :string,
    weight :number,     //权重
    content : string    //内容
  }
  
  class TopicModel {
    id     :string;
    create_at :string;
    title :string;
    content : string; 
    weight :number;
    constructor(){
      this.id = '';
      this.create_at = '';
      this.title = '';
      this.weight = 0;
      this.content = '';
    } 
  }
  
  export { ITopic ,TopicModel }
  