import axios from 'axios';
import { ITopic } from '../model'
import Conf from '../conf'
import moment from '../common/moment-cn'
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

const findById = (id :string) => {
    return new Promise<IAJAXTopic>((resolve ,reject) => {
        axios.get(host + '/topic/fdi',{
            params : { id }
        }).then((request) => {
            if(request.data.success){
                let result = request.data.data;
                result.create_at = moment(result.create_at).format('YYYY MMMM Do, h:mm:ss a')
                resolve(request.data) 
           }else{
                resolve(request.data) 
           }             
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

/**
 * 获取剧本。
 */
const getDatas = (page :number = 0 ,size :number = 10) => {
    return new Promise<IAJAXTopics>((resolve ,reject) => {
        axios.get(host + '/topic/fd',{
            params : { page ,size }
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

const create = (title :string ,content :string ,token :string) => {
    return new Promise<IAJAXTopic>((resolve ,reject) => {
        axios.post(host + '/topic/ct',{
            title , content
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data) 
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const remove = (id :string ,token :string) => {
    return new Promise<IAJAXTopic>((resolve ,reject) => {
        axios.post(host + '/topic/rm',{
            id
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)             
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}


export default { 
    getDatas, 
    findById,
    create,
    remove
}