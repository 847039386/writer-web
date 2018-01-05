import Mock from 'mockjs'
import { GetURL } from '../../public/util'
import { Chapter ,Chapters } from '../'

Mock.mock(GetURL('/chapter/fdi'), {
    'data'    :Chapter,
    'success' : true,
});

Mock.mock(GetURL('/chapter/fd'), {
    'data|30-50'    :[Chapters],
    'success' : true,
});

Mock.mock(GetURL('/chapter/rm'), {
    'data'    :Chapter,
    'success' : true,
});

Mock.mock(GetURL('/chapter/ct'), {
    'data'    :Chapter,
    'success' : true,
});

Mock.mock(GetURL('/chapter/ut'), {
    'data'    :Chapter,
    'success' : true,
});

Mock.mock(GetURL('/chapter/utorder'), {
    'data'    :{
        "ok": 1,
        "nModified": 1,
        "n": 1
    },
    'success' : true,
});