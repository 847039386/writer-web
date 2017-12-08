import axios from 'axios';
import { ICategory } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

interface Pagination {
    total : number,
    current :number,
    size : number
}
// 多条剧本数据
interface IAJAXCategorys {
    data? :ICategory [],
    pagination? : Pagination,
    success : boolean,
    msg? : string,
}

interface IAJAXCategoryCURD {
    data? :ICategory,
    success : boolean,
    msg? : string,
}


/**
 * 获取剧本。
 */
const find = (page :number = 0,count :number = 10) => {
    return new Promise<IAJAXCategorys>((resolve ,reject) => {
        axios.get(host + 'drama/category/find').then((request) => {
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
    return new Promise<IAJAXCategoryCURD>((resolve ,reject) => {
        axios.get(host + 'drama/category/save').then((request) => {
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
    return new Promise<IAJAXCategoryCURD>((resolve ,reject) => {
        axios.get(host + 'drama/category/update/id').then((request) => {
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
    return new Promise<IAJAXCategorys>((resolve ,reject) => {
        axios.get(host + 'drama/category/search').then((request) => {
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