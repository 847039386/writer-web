import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { RelationFans ,RelationStars } from './'

Mock.mock(GetURL('/relation/fans'), {
    'data|10'    :[RelationFans],
    'pagination' :Pagination,
    'success' : true,
});


Mock.mock(GetURL('/relation/stars'), {
    'data|10'    :[RelationStars],
    'pagination' :Pagination,
    'success' : true,
});

Mock.mock(GetURL('/relation/isfollow'), {
    'data|1' :true,
    'success' : true,
});

Mock.mock(GetURL('/relation/follow'), {
    'data|1' :true,
    'success' : true,
});





