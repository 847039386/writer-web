import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { Category } from '../'

Mock.mock(GetURL('/category/fd'), {
  'data|10'   :[Category],
  'pagination' : Pagination,
  'success' : true,
});

Mock.mock(GetURL('/category/ct'), {
  'data' :{
      "id"          : "@word(15)",
      "name"        : '该数据是ajax_category，创建：@integer(1,100)',
      "create_at"   : "@date()",
  },
  'success' : true,
});

Mock.mock(GetURL('/category/ut'), {
  'data' :{
      "id"          : "@word(15)",
      "name"        : '该数据是ajax_category，修改：@integer(1,100)',
      "create_at"   : "@date()",
  },
  'success' : true,
});

Mock.mock(GetURL('/category/rm'), {
  'data' :Category,
  'success' : true,
});

Mock.mock(GetURL('/category/search'), {
  'data|3-5'   :[Category],
  'pagination' :Pagination,
  'success' : true,
});