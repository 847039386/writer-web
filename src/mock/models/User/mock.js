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

Mock.mock(GetURL('user/pac/email'), {
  'data'    :'@word(4)',
  'success' : true,
});

Mock.mock(GetURL('user/findRepeatEmail'), {
  'data'    : '@email',
  'success|1' : true,
});

Mock.mock(GetURL('user/login'), {
  'data'    :User,
  'success|1' : true,
  'msg' : '这是登陆失败或成功时的一条详情信息。'
});
Mock.mock(GetURL('user/register'), {
  'data'    :User,
  'success|1' : true,
  'msg' : '这是注册失败或成功时的一条详情信息。'
});
