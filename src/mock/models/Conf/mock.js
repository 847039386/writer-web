import Mock from 'mockjs'
import { Pagination } from '../../public/models/pagination'
import { GetURL } from '../../public/util'
import { Home } from './'

//模糊查询names
Mock.mock(GetURL('cf/home'), {
    'data'    :Home,
    'success' :true,
});  
