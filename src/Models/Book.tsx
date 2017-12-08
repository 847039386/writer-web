interface IBook {
    id     :string,     //id
    create_at :string,  //创建时间
    name :string,
  }
  
  class BookModel {
    id     :string;     
    create_at :string;  
    name : string;      
    constructor(){
      this.id = '';
      this.create_at = '';
      this.name = '';
    } 
  }
  
  export { IBook ,BookModel }
  