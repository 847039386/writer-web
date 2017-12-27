import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { Drama , DramaNames } from '../'


//剧本列表
Mock.mock(GetURL('/drama/fd'), {
    'data|10'    :[Drama],
    'pagination' :Pagination,
    'success' : true,
});

//文章
Mock.mock(GetURL('/drama/details'), {
    'data'      : Drama,
    'success' : true,
});



Mock.mock(GetURL('/drama/fdbui'), {
    'data|5'      : [Drama],
    'pagination' :Pagination,
    'success' : true,
});  

Mock.mock(GetURL('/drama/abstract'), {
    'data'      : { abstract :'abstract' },
    'success' : true,
});  

Mock.mock(GetURL('/drama/character'), {
    'data'      : { character :'character' },
    'success' : true,
});

Mock.mock(GetURL('/drama/rm'), {
    'data'      : Drama,
    'success' : true,
});

Mock.mock(GetURL('/drama/ct'), {
    'data'      : Drama,
    'success' : true,
});
