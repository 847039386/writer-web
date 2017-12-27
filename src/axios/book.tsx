import axios from 'axios';
import { IBook } from '../model'
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
const find = (page :number = 0,size :number = 10) => {
    return new Promise<IAJAXBooks>((resolve ,reject) => {
        axios.get(host + '/book/fd',{ 
            params: { page , size }
         }).then((request) => {
            if(request.data.success){
                let result :Array<any> = request.data.data;
                result = result.map((item ) => {
                    item.key = item._id;
                    return item;
                })
                resolve(request.data)

            }else{
                resolve(request.data) 
            } 
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const save = (name :string ,token :string) => {
    return new Promise<IAJAXBookCURD>((resolve ,reject) => {
        axios.post(host + '/book/ct',{ 
            name
         },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)             
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const update = (id :string ,name :string ,rname :string ,token :string) => {
    return new Promise<IAJAXBookCURD>((resolve ,reject) => {
        if(name == rname){
            resolve({success :false ,msg :'修改重复'})
        }else{
            axios.post(host + '/book/ut',{ 
                id ,name
            },{headers :{ authorization : token }}).then((request) => {
                resolve(request.data)            
            }).catch((err) => {
                resolve({success :false})
            })
        }
    }) 
}

const remove = (id :string ,token :string) => {
    return new Promise<IAJAXBookCURD>((resolve ,reject) => {
        axios.post(host + '/book/rm',{ 
            id
         },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)            
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const search = (name :string ,page :number = 1 ,size :number = 10) => {
    return new Promise<IAJAXBooks>((resolve ,reject) => {
        axios.get(host + '/book/search',{
            params: { name ,page ,size }
        }).then((request) => {
            if(request.data.success){
                let result :Array<any> = request.data.data;
                result = result.map((item ) => {
                    item.key = item._id;
                    return item;
                })
                resolve(request.data)

            }else{
                resolve(request.data) 
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
    remove,
    search 
}