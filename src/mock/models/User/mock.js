import Mock from 'mockjs'
import { GetURL } from '../../public/util'
import { User ,UserPresentation } from '../'

Mock.mock(GetURL('/user/info'), {
  'data'    :User,
  'success' : true,
});

Mock.mock(GetURL('/us/hlg'), {
  'data'    :User,
  'success|1' : true,
  'msg' : '这是登陆失败或成功时的一条详情信息。'
});


Mock.mock(GetURL('/us/hct'), {
  'data'    :User,
  'success|1' : true,
  'msg' : '这是注册失败或成功时的一条详情信息。'
});

Mock.mock(GetURL('/us/fdbi'), {
  'data'    :User,
  'success' : true,
});

Mock.mock(GetURL('/admin/sendpac'), {
  'data'    :'abcd',
  'success' : true,
});

