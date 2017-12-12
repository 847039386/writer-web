import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { Drama , DramaNames } from '../'


//剧本列表
Mock.mock(GetURL('drama/data/list'), {
    'data|10'    :[Drama],
    'pagination' :Pagination,
    'success' : true,
});

//文章
Mock.mock(GetURL('drama/data/details'), {
    'data'      : Drama,
    'success' : true,
});

//模糊查询names
Mock.mock(GetURL('drama/data/dim'), {
    'data|5'      : [DramaNames],
    'success' : true,
});  