import axios from 'axios';
import { IBook } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

interface Pagination {
    total : number,
    current :number,
    size : number
}
// 多条剧本数据
interface IAJAXBooks {
    data? :IBook [],
    pagination? : Pagination,
    success : boolean,
    msg? : string,
}

interface IAJAXBookCURD {
    data? :IBook,
    success : boolean,
    msg? : string,
}


/**
 * 获取剧本。
 */
const find = (page :number = 0,count :number = 10) => {
    return new Promise<IAJAXBooks>((resolve ,reject) => {
        axios.get(host + 'drama/book/find').then((request) => {
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

const save = (name :string) => {
    return new Promise<IAJAXBookCURD>((resolve ,reject) => {
        axios.get(host + 'drama/book/save').then((request) => {
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

const update = (id :string) => {
    return new Promise<IAJAXBookCURD>((resolve ,reject) => {
        axios.get(host + 'drama/book/update/id').then((request) => {
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

const search = (name :string ,page :number = 1) => {
    return new Promise<IAJAXBooks>((resolve ,reject) => {
        axios.get(host + 'drama/book/search').then((request) => {
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
    find,
    save,
    update,
    search 
}