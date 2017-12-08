import Mock from 'mockjs'
import { GetURL } from './util'

//评论
const Book = {
    "id"          : "@word(15)",
    "name|1"  : [ '电影' ,'电视剧' ,'小品'],
    "create_at"   : "@date()",
}

Mock.mock(GetURL('drama/book/find'), {
  'data|10'   :[Book],
  'pagination' : {
        'total' : '@integer(25,27)',
        'current|1' :[1,2,3],
        'size|1' : [10]
  },
  'success' : true,
});

Mock.mock(GetURL('drama/book/save'), {
  'data' :{
      "id"          : "@word(15)",
      "name"        : '该数据是ajax_book，创建：@integer(1,100)',
      "create_at"   : "@date()",
  },
  'success' : true,
});

Mock.mock(GetURL('drama/book/update/id'), {
  'data' :{
      "id"          : "@word(15)",
      "name"        : '该数据是ajax_book，修改：@integer(1,100)',
      "create_at"   : "@date()",
  },
  'success' : true,
});

Mock.mock(GetURL('drama/book/search'), {
  'data|10'   :[Book],
  'pagination' : {
        'total' : '@integer(11,15)',
        'current|1' :[1],
        'size|1' : [10]
        
  },
  'success' : true,
});