import Mock from 'mockjs'
import { biography } from './data/md'
import { GetURL } from './util'

// 用户
const User = {
    "id"           :"@word(15)",
    "name"         :"@cname",
    "follow"       :"@integer(1,10000)",
    "avatar"       :"@image",
    "token"        :"@word(15)",
}

// 剧本文章详情
const Drama = {
    "id"       : "@word(15)",
    "user_id"  : "@word(15)",
    "title"    : '@ctitle(10,15)',
    "user"     : User,
    "type|1-3" : [ "类型"],
    "weight" : 0,
    "create_at": "@date()",
    "description" : "@cparagraph",
    "abstract" : "@cparagraph",
    "character" : biography.join('  \n'),
    "episodes|3-5" : ['@word(15)']     //这里是Episodes的ID
}

const DramaNames = {
    "id" : "@word(15)",
    "title" : "@ctitle(10)"
}

//剧本列表
Mock.mock(GetURL('drama/data/list'), {
    'data|10'    :[Drama],
    'pagination' :{
        'total' : '@integer(25,27)',
        'current|1' :[1,2,3,4,5],
        'size|1' : [10]
    },
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
