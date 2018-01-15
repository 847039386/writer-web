import axios from 'axios';
import { ICommentPopulate ,IComment } from '../model';
import Conf from '../conf';
import moment from '../common/moment-cn';
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
const send = (uid :string ,did :string ,content :string ,token :string) => {
    return new Promise<IAJAXComment>((resolve ,reject) => {
        axios.post(`${host}/v1/comment/ct`,{
            uid ,did ,content
        },{headers :{ authorization : token ,aud :uid }}).then((request) => {
            resolve(request.data)            
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

//根据剧本id 获取该剧本下所有评论
const findByDramaID = (drama_id :string ,page :number ,size :number = 10) => {
    return new Promise<IAJAXComments>((resolve ,reject) => {
        axios.get(`${host}/v1/comment/fd`,{
            params : { id : drama_id ,page ,size}
        }).then((request) => { 
            if(request.data.success){
                let result :Array<any> = request.data.data;
                result = result.map((item ) => {
                    item.key = item._id;
                    item.create_at = moment(item.create_at).endOf('minute').fromNow();
                    return item;
                })
                resolve(request.data)

            }else{
                resolve(request.data) 
            }
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const findRemoveByID = (id :string ,token :string ,user_id :string) => {
    return new Promise<IAJAXComment>((resolve ,reject) => {
        axios.post(`${host}/v1/comment/rm`,{
            id 
        },{headers :{ authorization : token ,aud :user_id }}).then((request) => {
            resolve(request.data)            
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
    
}


export default {
    findByDramaID,
    send,
    findRemoveByID
}

