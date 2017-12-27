interface IChapter {
  _id     :string,     //id
  create_at :string,  //创建时间
  drama_id : string,       //剧本ID
  title :string,
  content : string    //内容
}

class ChapterModel {
  _id     :string;     
  create_at :string;  
  drama_id : string;      
  title :string;
  content : string;   
  constructor(){
    this._id = '';
    this.create_at = '';
    this.drama_id = '';
    this.title = '';
    this.content = '';
  } 
}

export { IChapter ,ChapterModel }
