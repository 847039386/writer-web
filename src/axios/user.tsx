import axios from 'axios';
import { IPresentation ,IUser } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

// 一条用户详情接口
interface IAJAXPresentation {
    data? :IPresentation,
    success : boolean,
    msg? : string,
}

interface IAJAXUser {
    data? :IUser,
    success : boolean,
    msg? : string,
}

interface IAJAXUsers {
    data? :[IUser],
    success : boolean,
    msg? : string,
}

interface IAJAXPAC {
    data? :string,
    success :boolean,
    msg? :string
}

//获取用户详情简介内容
const getPresentationByUserID = (user_id :string) => {
    return new Promise<IAJAXPresentation>((resolve ,reject) => {
        axios.get(`${host}user/presentation`).then((request) => {
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

//根据用户ID获取用户信息
const getUserById = (id :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.get(`${host}user/info`).then((request) => {
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

const Login = (username :string ,password :string) => {
    return new Promise<IAJAXUser>((resolve ,reject) => {
        axios.get(`${host}user/info`).then((request) => {
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

const getWelcomeUsers = () => {
    return new Promise<IAJAXUsers>((resolve ,reject) => {
        axios.get(`${host}user/welcome`).then((request) => {
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

const getEmailPAC = (token :string) => {
    return new Promise<IAJAXPAC>((resolve ,reject) => {
        axios.get(`${host}pac/email`).then((request) => {
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
    getPresentationByUserID,
    getUserById,
    Login,
    getWelcomeUsers,
    getEmailPAC
}