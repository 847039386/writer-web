import axios from 'axios';
import { ICommentPopulate ,IComment } from '../Models';
import Conf from '../conf';
const host = Conf.host || 'http://test.com/';

// 一条comment接口
interface IAJAXComment {
    data? :IComment,
    success : boolean,
    msg? : string,
}
interface Pagination {
    total : number,
    current :number,
    size : number
}
// 多条comment接口
interface IAJAXComments {
    data? :ICommentPopulate [],
    pagination? :Pagination,
    success : boolean,
    msg? : string,
}


//根据usertoken 添加一条评论
const setCommentByUserToken = (token :string) => {
    return new Promise<IAJAXComment>((resolve ,reject) => {
        axios.get(`${host}drama/comment/save`).then((request) => {
            if(request.data.success){
                resolve(request.data) 
            }else{
                resolve({success :false})
            }             
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

//根据剧本id 获取该剧本下所有评论
const getCommentsByDramaID = (drama_id :string ,page :number) => {
    return new Promise<IAJAXComments>((resolve ,reject) => {
        axios.get(`${host}drama/comment/find`).then((request) => {
            if(request.data.success){
                resolve(request.data) 
            }else{
                resolve({success :false})
            }             
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}


export default {
    getCommentsByDramaID,
    setCommentByUserToken
}

