import { biography } from '../../data/md'
import { User } from '../User'
import { Book } from '../Book'
import { Category } from '../Category'

// 剧本文章详情
const Drama = {
    "_id"       : "@word(15)",
    "user_id"  : User,
    "title"    : '@ctitle(10,15)',
    "book_id" :  Book,
    "category_id|1-3" : [Category],
    "weight" : 0,
    "create_at": "@date()",
    "description" : "@cparagraph",
    "abstract" : "@cparagraph",
    "reading_count" :'@integer(300, 500)',
    "reading_week_count" :'@integer(60, 100)',
    "reading_month_count" :'@integer(101, 200)',
    "character" : biography.join('  \n'),
}

export { Drama }
