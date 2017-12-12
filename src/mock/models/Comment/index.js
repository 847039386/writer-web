import { User } from '../User'


const Comment = {
    "id"          : "@word(15)",
    "user_id"    : User,
    "create_at"   : "@date()",
    "content"     : "@ctitle(15,100)"
}


export { Comment }