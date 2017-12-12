import Mock from 'mockjs'
import { Book } from '../index'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'

Mock.mock(GetURL('drama/book/find'), {
  'data|10'   :[Book],
  'pagination' : Pagination,
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
  'pagination' : Pagination,
  'success' : true,
});