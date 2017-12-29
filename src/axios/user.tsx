import axios from 'axios';
import { IUser } from '../model'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'


interface IAJAXUser {
    data? :IUser,
    success : boolean,
    msg? : string,
}

interface IAJAXAEmail {
    data? :string,
    success :boolean,
    msg? :string
}

//根据用户ID获取用户信息
const getUserById = (id :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.get(`${host}/us/fdbi`,{
            params :{id}
        }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

// 本站登陆
const HOSTLogin = (uname :string ,pass :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.post(`${host}/us/hlg`,{ uname ,pass }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

// 本站注册
const HOSTRegister = (nickname :string ,username :string ,password :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.post(`${host}/us/hct`,{ 
            name :nickname ,
            uname :username,
            pass :password
        }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const findRepeatUName = (uname :string) => {
    return new Promise<IAJAXAEmail>((resolve ,reject) => {
        axios.get(`${host}/us/hrun`,{ 
            params: { uname }
         }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

// QQ登陆
const qqLogin = (code :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.get(`${host}/us/qlg`,{ 
            params: { code }
         }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    })
}

// 缓存登陆
const storageLogin = () => {
    return new Promise<any>((resolve ,reject) => {
        let user = sessionStorage.getItem('user')
        if(user){
            user = JSON.parse(user)
            resolve(user)
        }else{
            resolve({success :false ,msg :'缓存出错'})
        }
    })
}


export default {
    getUserById,
    HOSTLogin,
    HOSTRegister,
    findRepeatUName,
    qqLogin,
    storageLogin
}