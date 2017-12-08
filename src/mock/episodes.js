import Mock from 'mockjs'

import { episodes_md } from './data/md'
import { GetURL } from './util'

//集 ,一篇文章有多个集数
const Episodes = {
    "id"        : '@word(15)',
    "create_at" : '@date()',
    "mvid"      : '@word(15)',
    "title"     : '@ctitle(8)',
    'chapterorder|1-30' :1 ,
    "content"   : episodes_md.join('  \n')
}

const EpisodesAll = {
    'id' :'@word(15)',
    "title" : '@ctitle(8)',
}


Mock.mock(GetURL('drama/episodes/id'), {
    'data'    :Episodes,
    'success' : true,
});

Mock.mock(GetURL('drama/episodes/drama_id'), {
    'data|2-5'    :[EpisodesAll],
    'success' : true,
});

Mock.mock(GetURL('drama/episodes/remove'), {
    'data'    :Episodes,
    'success' : true,
});

Mock.mock(GetURL('drama/episodes/save'), {
    'data'    :Episodes,
    'success' : true,
});