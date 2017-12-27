import axios from 'axios';
import { IDrama } from '../model'
import moment from '../common/moment-cn'
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
        axios.get(host + '/drama/details',{
            params :{ id }
        }).then((request) => {
           if(request.data.success){
                let result = request.data.data;
                result.create_at = moment(result.create_at).format('YYYY MMMM Do, h:mm:ss a')
                resolve(request.data) 
           }else{
                resolve(request.data) 
           }         
        }).catch((err) => {
            console.log(err)
            resolve({success :false})
        })
    }) 
}

//根据userid 获取该用户的所有剧本Drama
const getDramasByUserID = (id :string ,page :number ,size :number = 10) => {
    return new Promise<IAJAXDramas>((resolve ,reject) => {
        axios.get(host + '/drama/fdbui',{
            params : {  id ,page ,size }
        }).then((request) => {
            resolve(request.data)            
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

/**
 * 获取剧本。
 */
const getDramas = (page :number = 0,size :number = 10) => {
    return new Promise<IAJAXDramas>((resolve ,reject) => {
        axios.get(host + '/drama/fd',{
            params :{  page ,size }
        }).then((request) => {
            if(request.data.success){
                let result :Array<any> = request.data.data;
                result = result.map((item ) => {
                    item.key = item._id;
                    item.create_at = moment(item.create_at).format('YYYY MMMM Do, h:mm:ss a')
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

const getDimTitles = (title :string) => {
    return new Promise<IAJAXDramasTitles>((resolve ,reject) => {
        axios.get(host + '/drama/data/dim').then((request) => {
            resolve(request.data)             
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const create = (user_id :string ,title :string ,book_id :string ,category_id :Array<string> ,description :string ,token :string) => {
    return new Promise<IAJAXDrama>((resolve ,reject) => {
        axios.post(`${host}/drama/ct` ,{ 
            user_id ,
            title ,
            book_id ,
            category_id,
            description : description || ''
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const remove = (id :string ,token :string) => {
    return new Promise<IAJAXDrama>((resolve ,reject) => {
        axios.post(`${host}/drama/rm` ,{ 
            id ,
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const getAbstract = (id :string ) => {
    return new Promise<IAJAXDrama>((resolve ,reject) => {
        axios.get(`${host}/drama/abstract`,{ 
            params :{ id }
        }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const getCharacter = (id :string ) => {
    return new Promise<IAJAXDrama>((resolve ,reject) => {
        axios.get(`${host}/drama/character`,{ 
            params :{ id }
        }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const setAbstract = (id :string ,content :string ,token :string) => {
    return new Promise<IAJAXDrama>((resolve ,reject) => {
        axios.post(`${host}/drama/abstract`,{ 
            id ,content
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}

const setCharacter = (id :string ,content :string ,token :string) => {
    return new Promise<IAJAXDrama>((resolve ,reject) => {
        axios.post(`${host}/drama/character`,{ 
            id ,content
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false})
        })
    }) 
}



export default { 
    getDramasByUserID, 
    getDramaByID,
    getDramas,
    getDimTitles,
    create,
    remove,
    getAbstract,
    getCharacter,
    setAbstract,
    setCharacter
}