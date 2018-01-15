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

interface IAJAXAUserStatus {
    data? :Array<any>,
    success :boolean,
    msg? :string
}

interface IAJAXAUserBind {
    data? :string,
    success :boolean,
    msg? :string
}

//根据用户ID获取用户信息
const getUserById = (id :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.get(`${host}/v1/us/fdbi`,{
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
        axios.post(`${host}/v1/us/hlg`,{ uname ,pass }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

// 本站注册
const HOSTRegister = (nickname :string ,username :string ,password :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.post(`${host}/v1/us/hct`,{ 
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

type UserAuth_identity_type = 'qq' | 'email' | 'username'

const findRepeatUIdentifier = (identifier :string ,identity_type :UserAuth_identity_type) => {
    return new Promise<IAJAXAEmail>((resolve ,reject) => {
        axios.post(`${host}/v1/us/hrun`,{ 
            identifier ,identity_type
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
        axios.get(`${host}/v1/us/qlg`,{ 
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
// 获取用户简介
const getPresentation = (id :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.get(`${host}/v1/us/presentation`,{ 
            params: { id }
         }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    })
}
// 设置用户简介
const setPresentation = (id :string ,content :string ,token :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.post(`${host}/v1/us/presentation`,{ 
            id ,content
        },{headers :{ authorization : token ,aud :id }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const utAvatarAndName = (id :string ,token :string ,name :string ,avatar :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.post(`${host}/v1/us/utan`,{ 
            name ,avatar ,id
        },{headers :{ authorization : token ,aud :id }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

// 用户的所有绑定登陆信息
const userBindStatus = (id :string ,token :string) => {
    return new Promise<IAJAXAUserStatus>((resolve ,reject) => {
        axios.post(`${host}/v1/us/bs`,{ 
            id 
        },{headers :{ authorization : token ,aud :id }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

// 向用户发送一封带有验证码的邮件
const findEmailSendPAC = ( uid :string ,email :string ) =>{
    return new Promise<IAJAXAUserStatus>((resolve ,reject) => {
        axios.post(`${host}/v1/us/sendpac`,{ 
            email ,uid
        }).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

//绑定邮箱或者更改邮箱
const bindUserEmail = ( uid :string ,email :string ,pac :string ,token :string) =>{
    pac = pac.replace(/^\s+|\s+$/g,"") || pac
    return new Promise<IAJAXAUserStatus>((resolve ,reject) => {
        axios.post(`${host}/v1/us/bndemail`,{ 
            email ,uid ,pac
        },{headers :{ authorization : token ,aud :uid }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const bindHostUserNameOrUpdatePassword = (uid :string ,username :string ,password :string ,old_password :string ,token :string) => {
    return new Promise<IAJAXAUserBind>((resolve ,reject) => {
        axios.post(`${host}/v1/us/bndunop`,{ 
            uid ,uname :username ,pass :password ,old_pass :old_password
        },{headers :{ authorization : token ,aud :uid }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const bindUserQQ = (code :string ,uid :string ,token :string) => {
    return new Promise<IAJAXAUserBind>((resolve ,reject) => {
        axios.post(`${host}/v1/us/bndqq`,{ 
            uid ,code 
        },{headers :{ authorization : token ,aud :uid }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}



const updatePassByEmail = (uid :string , pass :string ,pac :string ,token :string) => {
    pac = pac.replace(/^\s+|\s+$/g,"") || pac
    return new Promise<IAJAXAUserBind>((resolve ,reject) => {
        axios.post(`${host}/v1/us/utpwbmail`,{ 
            uid ,pass ,pac
        },{headers :{ authorization : token ,aud :uid }}).then((request) => {
            resolve(request.data)           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

export default {
    getUserById,
    HOSTLogin,
    HOSTRegister,
    findRepeatUIdentifier,
    qqLogin,
    storageLogin,
    setPresentation,
    getPresentation,
    utAvatarAndName,
    userBindStatus,
    findEmailSendPAC,
    bindUserEmail,
    bindHostUserNameOrUpdatePassword,
    bindUserQQ,
    updatePassByEmail
}