import axios from 'axios';
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

interface Pagination {
    total : number,
    current :number,
    size : number
}

interface IAJAXPAC {
    data? :string,
    success :boolean,
    msg? :string
}

// 多条数据
interface IAJAXAdmins {
    data? :Object [],
    pagination? : Pagination,
    success : boolean,
    msg? : string,
}


const getEmailPAC = (email :string) => {
    return new Promise<IAJAXPAC>((resolve ,reject) => {
        axios.post(`${host}/v1/adm/sendpac`,{
            email
        }).then((request) => {
            resolve(request.data)          
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const login = (email :string , pac:string ) => {
    return new Promise<IAJAXPAC>((resolve ,reject) => {
        axios.post(`${host}/v1/adm/lg`,{
            email ,pac
        }).then((request) => {
            resolve(request.data)              
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const childAdminRegister = (name :string ,email :string ,cdkey :string ,pac :string) => {
    return new Promise<IAJAXPAC>((resolve ,reject) => {
        axios.post(`${host}/v1/adm/cct`,{
            name ,email ,cdkey ,pac
        }).then((request) => {
            resolve(request.data)              
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const find = (page :number = 0,size :number = 10) => {
    return new Promise<IAJAXAdmins>((resolve ,reject) => {
        axios.get(host + '/v1/adm/fd',{ 
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

const generateCDKEY = (email :string ,token :string) => {
    return new Promise<IAJAXPAC>((resolve ,reject) => {
        axios.post(`${host}/v1/adm/cdkey`,{
            email
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)          
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const remove = (token :string ,id :string) => {
    return new Promise<IAJAXPAC>((resolve ,reject) => {
        axios.post(`${host}/v1/adm/rm`,{
            id
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)          
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const storageLogin = () => {
    return new Promise<any>((resolve ,reject) => {
        let admin = sessionStorage.getItem('admin')
        if(admin){
            admin = JSON.parse(admin)
            resolve(admin)
        }else{
            resolve({success :false ,msg :'缓存出错'})
        }
    })
}

export default {
    generateCDKEY,
    getEmailPAC,
    login,
    storageLogin,
    find,
    childAdminRegister,
    remove
}