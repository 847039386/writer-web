import axios from 'axios';
import { ITopic } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

//一条剧本数据
interface IAJAXTopic {
    data? :ITopic,
    success : boolean,
    msg? : string,
}
interface Pagination {
    total : number,
    current :number,
    size : number
}
// 多条剧本数据
interface IAJAXTopics {
    data? :ITopic [],
    pagination? : Pagination,
    success : boolean,
    msg? : string,
}

const getTopicById = (id :string) => {
    return new Promise<IAJAXTopic>((resolve ,reject) => {
        axios.get(host + 'topic/find/id').then((request) => {
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
const getTopics = (page :number = 0,count :number = 10) => {
    return new Promise<IAJAXTopics>((resolve ,reject) => {
        axios.get(host + 'topic/find').then((request) => {
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
    getTopics, 
    getTopicById
}