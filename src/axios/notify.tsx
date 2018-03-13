import axios from 'axios';
// import { IBook } from '../model'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

interface Pagination {
    total : number,
    current :number,
    size : number
}
// 多条剧本数据
interface IAJAXNotifys {
    data? :Object [],
    pagination? : Pagination,
    success : boolean,
    msg? : string,
}

interface IAJAXNotify {
    data? :any,
    success : boolean,
    msg? : string,
}


/**
 * 获取剧本。
 */
const find = (id :string ,page :number = 0,size :number = 10) => {
    return new Promise<IAJAXNotifys>((resolve ,reject) => {
        axios.get(host + '/v1/unotify/fd',{ 
            params: { page , size ,id }
         }).then((request) => {
            if(request.data.success){
                resolve(request.data)
            }else{
                resolve(request.data) 
            } 
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const findUserIDAndRemove = (uid :string ,token :string ) => {
    return new Promise<IAJAXNotify>((resolve ,reject) => {
        axios.post(`${host}/v1/unotify/rmi`,{
            uid 
        },{headers :{ authorization : token ,aud :uid }}).then((request) => {
            resolve(request.data)            
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    })  
}

export default { 
    find,
    findUserIDAndRemove
}