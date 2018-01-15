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
  'data'    :false,
  'success' : true,
});

Mock.mock(GetURL('/us/presentation'), {
  'data'    :User,
  'success' : true,
});

Mock.mock(GetURL('/us/bs'), {
  'data'    :[
    { _id :'@word(15)' ,identifier :'@word(15)' ,identity_type :'qq' },
    { _id :'@word(15)' ,identifier :'@word(15)' ,identity_type :'email' }
  ],
  'success' : true,
});

Mock.mock(GetURL('/us/utan'), {
  'data'    :User,
  'success' : true,
});

Mock.mock(GetURL('/us/sendpac'), {
  'data'    :'ABCDEF',
  'success' : true,
});

Mock.mock(GetURL('/us/bndemail'), {
  'data'    :{
    identifier :'ABC',
    identity_type :'email'
  },
  'success' : true,
});

Mock.mock(GetURL('/us/bndunop'), {
  'data'    :'username',
  'success' : true,
});

Mock.mock(GetURL('/us/utpwbmail'), {
  'data'    :'username',
  'msg' :'is success',
  'success' : true,
});

Mock.mock(GetURL('/us/bndqq'), {
  'data'    :true,
  'success' : true,
});



