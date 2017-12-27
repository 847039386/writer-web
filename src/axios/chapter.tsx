import axios from 'axios';
import { IChapter } from '../model'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

// 单条剧本的分集简介
interface IAJAXChapter {
    data? :IChapter,
    success : boolean,
    msg? : string,
}


interface Chapters {
    _id :string;
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
        axios.get(`${host}/chapter/fdi`,{
            params : { id }
        }).then((request) => {
            resolve(request.data)             
        }).catch((err) => {
            resolve({success :false})
        })
    })
}

//根据剧本ID获取所有该剧本分集id
const findByDramaID = (id :string) => {
    return new Promise<IAJAXChapters>((resolve ,reject) => {
        axios.get(`${host}/chapter/fd`,{
            params : { id }
        }).then((request) => {
            resolve(request.data)            
        }).catch((err) => {
            resolve({success :false})
        })
    })
}

const findByIdAndRemove = (id :string ,token :string) => {
    return new Promise<IAJAXChapter>((resolve ,reject) => {
        axios.post(`${host}/chapter/rm`,{ 
            id
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)            
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
const save = (id :string ,title :string ,content :string ,token :string) => {
    return new Promise<IAJAXChapter>((resolve ,reject) => {
        axios.post(`${host}/chapter/ct`,{ 
            id ,title ,content
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)             
        }).catch((err) => {
            resolve({success :false})
        })
    })
}

const findByIdAndUpdate = (id :string ,title :string ,content :string ,token :string) => {
    return new Promise<IAJAXChapter>((resolve ,reject) => {
        axios.post(`${host}/chapter/ut`,{ 
            id ,title ,content
        },{headers :{ authorization : token }}).then((request) => {
            resolve(request.data)         
        }).catch((err) => {
            resolve({success :false})
        })
    })
}

export default { 
    findById,
    findByIdAndRemove,
    save,
    findByDramaID,
    findByIdAndUpdate,
}