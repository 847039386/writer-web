import { IUser } from './User'

// 平常关系表
interface IRelation {
    _id :string,     //id
    from_user_id : string   // 粉丝
    to_user_id : string     //大佬
}  

// fans的populate
interface IRelationToFans {
    _id :string,     //id
    from_user_id : IUser   // 粉丝
    to_user_id : string     //大佬
}

// stars的populate
interface IRelationToStars {
    _id :string,     //id
    from_user_id : string,   // 粉丝
    to_user_id : IUser     //大佬
}
  
export { IRelation ,IRelationToFans ,IRelationToStars}