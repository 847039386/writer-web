import Mock from 'mockjs'
import { GetURL } from '../../public/util'
import { Admin } from '../'

Mock.mock(GetURL('/adm/sendpac'), {
  'data'    :'abcd',
  'success' : true,
});

Mock.mock(GetURL('/adm/lg'), {
  'data'    :Admin,
  'success' : true,
});