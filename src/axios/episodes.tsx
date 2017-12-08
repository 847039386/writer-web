import axios from 'axios';
import { IEpisode } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'

// 单条剧本的分集简介
interface IAJAXEpisodes {
    data? :IEpisode,
    success : boolean,
    msg? : string,
}


interface EpisodesAll {
    id :string;
    title :string
}

// 多条剧本分集ID
interface IAJAXEpisodesAll {
    data? :Array<EpisodesAll>,
    success : boolean,
    msg? : string,
}





//根据Episode_id获取剧本分集内容
const getEpisodesByID = (drama_id :string) => {
    return new Promise<IAJAXEpisodes>((resolve ,reject) => {
        axios.get(`${host}drama/episodes/id`).then((request) => {
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
const getEpisodesByDramaID = (drama_id :string) => {
    return new Promise<IAJAXEpisodesAll>((resolve ,reject) => {
        axios.get(`${host}drama/episodes/drama_id`).then((request) => {
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

const removeEpisodesByID = (drama_id :string) => {
    return new Promise<IAJAXEpisodes>((resolve ,reject) => {
        axios.get(`${host}drama/episodes/remove`).then((request) => {
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
const saveEpisodes = (drama_id :string ,content :string) => {
    return new Promise<IAJAXEpisodes>((resolve ,reject) => {
        axios.get(`${host}drama/episodes/save`).then((request) => {
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
    getEpisodesByID,
    getEpisodesByDramaID,
    removeEpisodesByID,
    saveEpisodes
}