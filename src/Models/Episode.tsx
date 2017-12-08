interface IEpisode {
  id     :string,     //id
  create_at :string,  //创建时间
  mvid : string,       //剧本ID
  title :string,
  content : string    //内容
}

class EpisodeModel {
  id     :string;     
  create_at :string;  
  mvid : string;      
  title :string;
  content : string;   
  constructor(){
    this.id = '';
    this.create_at = '';
    this.mvid = '';
    this.title = '';
    this.content = '';
  } 
}

export { IEpisode ,EpisodeModel }
