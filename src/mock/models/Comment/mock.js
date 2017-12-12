import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { Comment as CommentData } from '../'

Mock.mock(GetURL('drama/comment/find'), {
  'data|10'   :[CommentData],
  'pagination' : Pagination,
  'success' : true,
});

Mock.mock(GetURL('drama/comment/save'), {
  'data'    :CommentData,
  'success' : true,
});