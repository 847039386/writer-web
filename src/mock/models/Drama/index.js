import { biography } from '../../data/md'
import { User } from '../User'
import { Book } from '../Book'
import { Category } from '../Category'

// 剧本文章详情
const Drama = {
    "id"       : "@word(15)",
    "user_id"  : User,
    "title"    : '@ctitle(10,15)',
    "book_id" :  Book,
    "category_id|1-3" : [Category],
    "weight" : 0,
    "create_at": "@date()",
    "description" : "@cparagraph",
    "abstract" : "@cparagraph",
    "character" : biography.join('  \n'),
}

const DramaNames = {
    "id" : "@word(15)",
    "title" : "@ctitle(10)"
}


export { Drama , DramaNames }
