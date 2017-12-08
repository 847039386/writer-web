import Mock from 'mockjs'
import { GetURL } from './util'

//评论
const Comment = {
    "id"          : "@word(15)",
    "username"    : '@cname',
    "create_at"   : "@date()",
    "content"     : "@ctitle(15,100)"
}

Mock.mock(GetURL('drama/comment/find'), {
  'data|10'   :[Comment],
  'pagination' : {
        'total' : '@integer(25,27)',
        'current|1' :[1,2,3,4,5],
        'size|1' : [10]
  },
  'success' : true,
});

Mock.mock(GetURL('drama/comment/save'), {
  'data'    :Comment,
  'success' : true,
});