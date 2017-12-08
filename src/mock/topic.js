import Mock from 'mockjs'
import { GetURL } from './util'

//评论
const Topic = {
    "id"          : "@word(15)",
    "title"    : '@ctitle(15,20)',
    "weight"    : 0,
    "create_at"   : "@date()",
    "content"     : "@ctitle(200,300)"
}

Mock.mock(GetURL('topic/find'), {
  'data|10'   :[Topic],
  'pagination' : {
        'total' : '@integer(25,27)',
        'current|1' :[1,2,3,4,5],
        'size|1' : [10]
  },
  'success' : true,
});

Mock.mock(GetURL('topic/find/id'), {
    'data'    :Topic,
    'success' : true,
  });
