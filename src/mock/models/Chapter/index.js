import { episodes_md } from '../../data/md'

const Chapter = {
    "id"        : '@word(15)',
    "create_at" : '@date()',
    "drama_id"      : '@word(15)',
    "title"     : '@ctitle(8)',
    'chapterorder|1-30' :1 ,
    "content"   : episodes_md.join('  \n')
}

const Chapters = {
    'id' :'@word(15)',
    "title" : '@ctitle(8)',
}

export { Chapter ,  Chapters }