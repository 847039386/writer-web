import axios from 'axios';
import { IDrama } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

interface DTitles {
    id :string,
    title :string,
}

//一条剧本数据
interface IAJAXDrama {
    data? :IDrama,
    success : boolean,
    msg? : string,
}
interface Pagination {
    total : number,
    current :number,
    size : number
}
// 多条剧本数据
interface IAJAXDramas {
    data? :IDrama [],
    pagination? : Pagination,
    success : boolean,
    msg? : string,
}

// 模糊查询剧本数据
interface IAJAXDramasTitles {
    data? :DTitles [],
    success : boolean,
    msg? : string,
}


//获取剧本的内容详情页
const getDramaByID= (id :string) => {
    return new Promise<IAJAXDrama>((resolve ,reject) => {
        axios.get(host + 'drama/data/details').then((request) => {
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

//根据userid 获取该用户的所有剧本Drama
const getDramasByUserID = (id :string ,page :number ,count :number = 10) => {
    return new Promise<IAJAXDramas>((resolve ,reject) => {
        axios.get(host + 'drama/data/list').then((request) => {
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

/**
 * 获取剧本。
 */
const getDramas = (page :number = 0,count :number = 10) => {
    return new Promise<IAJAXDramas>((resolve ,reject) => {
        axios.get(host + 'drama/data/list').then((request) => {
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

const getDimTitles = (title :string) => {
    return new Promise<IAJAXDramasTitles>((resolve ,reject) => {
        axios.get(host + 'drama/data/dim').then((request) => {
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
    getDramasByUserID, 
    getDramaByID,
    getDramas,
    getDimTitles
}