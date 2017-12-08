import Mock from 'mockjs'
import { GetURL } from './util';

// 用户
const User = {
  "id"           :"@word(15)",
  "name"         :"@cname",
  "follow"       :"@integer(1,10000)",
  "avatar"       :"@image",
  "token"        :"@word(15)",
}

const UserPresentation = {
  "id"            : "@word(15)",
  "user_id"       : '@word(15)',
  "create_at"     : "@date()",
  "content"  : "@ctitle(15,10000)",
}

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
