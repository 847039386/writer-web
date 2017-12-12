import Mock from 'mockjs'
import { GetURL } from '../../public/util'
import { User ,UserPresentation } from '../'

Mock.mock(GetURL('user/info'), {
  'data'    :User,
  'success' : true,
});

//剧本梗概
Mock.mock(GetURL('user/presentation'), {
  'data'    :UserPresentation,
  'success' : true,
});

Mock.mock(GetURL('user/welcome'), {
  'data|5'    :[User],
  'success' : true,
});

Mock.mock(GetURL('pac/email'), {
  'data'    :'@word(4)',
  'success' : true,
});
