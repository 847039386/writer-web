import { User } from '../User'

// 剧本文章详情
const RelationFans = {
    "_id"          : "@word(15)",
    "from_user_id" : User
}

const RelationStars = {
    "_id"          : "@word(15)",
    "to_user_id" : User
}

export { RelationFans ,RelationStars }