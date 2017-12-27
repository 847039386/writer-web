import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { Topic } from '../'

Mock.mock(GetURL('/topic/fd'), {
  'data|10'   :[Topic],
  'pagination' :Pagination,
  'success' : true,
});

Mock.mock(GetURL('/topic/fdi'), {
    'data'    :Topic,
    'success' : true,
});

Mock.mock(GetURL('/topic/ct'), {
  'data'    :Topic,
  'success' : true,
});

Mock.mock(GetURL('/topic/rm'), {
  'data'    :Topic,
  'success' : true,
});
