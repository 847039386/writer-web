import axios from 'axios';
import { ICategory } from '../model'
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
const find = (page :number = 0,size :number = 10) => {
    return new Promise<IAJAXCategorys>((resolve ,reject) => {
        axios.get(host + '/category/fd',{ 
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
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const save = (name :string ,token :string) => {
    return new Promise<IAJAXCategoryCURD>((resolve ,reject) => {
        axios.post(host + '/category/ct',{ 
            name
         },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)             
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const update = (id :string ,name :string ,rname :string ,token :string) => {
    return new Promise<IAJAXCategoryCURD>((resolve ,reject) => {
        if(name == rname){
            resolve({success :false ,msg :'修改重复'})
        }else{
            axios.post(host + '/category/ut',{ 
                id , name  
            },{headers :{ authorization : token }}).then((request) => {
                resolve(request.data)            
            }).catch((err) => {
                resolve({success :false ,msg :err.message })
            })
        }
    }) 
}

const remove = (id :string ,token :string) => {
    return new Promise<IAJAXCategoryCURD>((resolve ,reject) => {
        axios.post(host + '/category/rm',{ 
            id 
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)            
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const search = (name :string ,page :number = 1 ,size :number = 10) => {
    return new Promise<IAJAXCategorys>((resolve ,reject) => {
        axios.get(host + '/category/search',{
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
            resolve({success :false ,msg :err.message })
        })
    }) 
}

 

export default { 
    find,
    save,
    remove,
    update,
    search 
}