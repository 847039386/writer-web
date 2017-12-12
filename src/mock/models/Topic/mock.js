import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { Topic } from '../'

Mock.mock(GetURL('topic/find'), {
  'data|10'   :[Topic],
  'pagination' :Pagination,
  'success' : true,
});

Mock.mock(GetURL('topic/find/id'), {
    'data'    :Topic,
    'success' : true,
});
