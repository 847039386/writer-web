import axios from 'axios';
import { IChapter } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

// 单条剧本的分集简介
interface IAJAXChapter {
    data? :IChapter,
    success : boolean,
    msg? : string,
}


interface Chapters {
    id :string;
    title :string
}

// 多条剧本分集ID
interface IAJAXChapters {
    data? :Array<Chapters>,
    success : boolean,
    msg? : string,
}





//根据Episode_id获取剧本分集内容
const findById = (id :string) => {
    return new Promise<IAJAXChapter>((resolve ,reject) => {
        axios.get(`${host}drama/chapter/findbyid`).then((request) => {
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

//根据剧本ID获取所有该剧本分集id
const getDataByDramaID = (drama_id :string) => {
    return new Promise<IAJAXChapters>((resolve ,reject) => {
        axios.get(`${host}drama/chapter/findbydramaId`).then((request) => {
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

const findByIdAndRemove = (id :string) => {
    return new Promise<IAJAXChapter>((resolve ,reject) => {
        axios.get(`${host}drama/chapter/remove`).then((request) => {
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
 * 
 * @param drama_id 剧本ID
 * @param content 该剧集内容
 */
const save = (drama_id :string ,content :string) => {
    return new Promise<IAJAXChapter>((resolve ,reject) => {
        axios.get(`${host}drama/chapter/save`).then((request) => {
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

const findByIdAndUpdate = (id :string ,content :string) => {
    return new Promise<IAJAXChapter>((resolve ,reject) => {
        axios.get(`${host}drama/chapter/update`).then((request) => {
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
    findById,
    findByIdAndRemove,
    save,
    getDataByDramaID,
    findByIdAndUpdate
}