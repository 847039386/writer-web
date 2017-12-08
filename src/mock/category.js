import Mock from 'mockjs'
import { GetURL } from './util'

//评论
const Category = {
    "id"          : "@word(15)",
    "name|1"       : [ '搞笑' ,'军事' ,'战争' ,'青春' ,'言情' ,'丧尸','狗尾巴花'],
    "create_at"   : "@date()",
}

Mock.mock(GetURL('drama/category/find'), {
  'data|10'   :[Category],
  'pagination' : {
        'total' : '@integer(25,27)',
        'current|1' :[1,2,3],
        'size|1' : [10]
        
  },
  'success' : true,
});

Mock.mock(GetURL('drama/category/save'), {
  'data' :{
      "id"          : "@word(15)",
      "name"        : '该数据是ajax_category，创建：@integer(1,100)',
      "create_at"   : "@date()",
  },
  'success' : true,
});

Mock.mock(GetURL('drama/category/update/id'), {
  'data' :{
      "id"          : "@word(15)",
      "name"        : '该数据是ajax_category，修改：@integer(1,100)',
      "create_at"   : "@date()",
  },
  'success' : true,
});

Mock.mock(GetURL('drama/category/search'), {
  'data|3-5'   :[Category],
  'pagination' : {
        'total' : '@integer(3,5)',
        'current|1' :[1],
        'size|1' : [10]
        
  },
  'success' : true,
});