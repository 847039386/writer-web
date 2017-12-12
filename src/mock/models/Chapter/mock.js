import Mock from 'mockjs'
import { GetURL } from '../../public/util'
import { Chapter ,Chapters } from '../'

Mock.mock(GetURL('drama/chapter/findbyid'), {
    'data'    :Chapter,
    'success' : true,
});

Mock.mock(GetURL('drama/chapter/findbydramaId'), {
    'data|2-5'    :[Chapters],
    'success' : true,
});

Mock.mock(GetURL('drama/chapter/remove'), {
    'data'    :Chapter,
    'success' : true,
});

Mock.mock(GetURL('drama/chapter/save'), {
    'data'    :Chapter,
    'success' : true,
});

Mock.mock(GetURL('drama/chapter/update'), {
    'data'    :Chapter,
    'success' : true,
});