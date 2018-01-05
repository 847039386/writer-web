import Mock from 'mockjs'
import { GetURL } from '../../public/util'

Mock.mock(GetURL('/dlike/is'), {
    'data|1' :true,
    'success' : true,
});

Mock.mock(GetURL('/dlike/ct'), {
    'data|1' :true,
    'success' : true,
});





