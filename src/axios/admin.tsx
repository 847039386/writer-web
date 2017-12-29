import axios from 'axios';
// import { IUser } from '../model'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

interface IAJAXPAC {
    data? :string,
    success :boolean,
    msg? :string
}


const getEmailPAC = (email :string) => {
    return new Promise<IAJAXPAC>((resolve ,reject) => {
        axios.post(`${host}/adm/sendpac`,{
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
        axios.post(`${host}/adm/lg`,{
            email ,pac
        }).then((request) => {
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
    getEmailPAC,
    login,
    storageLogin
}