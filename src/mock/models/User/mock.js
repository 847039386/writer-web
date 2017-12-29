import Mock from 'mockjs'
import { GetURL } from '../../public/util'
import { User } from '../'


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

Mock.mock(GetURL('/us/hrun'), {
  'data'    :'username',
  'success' : true,
});

Mock.mock(GetURL('/us/presentation'), {
  'data'    :User,
  'success' : true,
});

