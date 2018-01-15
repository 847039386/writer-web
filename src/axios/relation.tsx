import axios from 'axios';
import Conf from '../conf'
import { IRelationToFans ,IRelationToStars } from '../model'
const host = Conf.host || 'http://test.com/'

interface Pagination {
    total : number,
    current :number,
    size : number
}

interface IAJAXRelationToFans {
    data? :Array<IRelationToFans>,
    pagination? :Pagination
    success :boolean,
    msg? :string
}

interface IAJAXRelationToStars {
    data? :Array<IRelationToStars>,
    pagination? :Pagination
    success :boolean,
    msg? :string
}

interface IAJAXFollow {
    data? :boolean,
    success :boolean,
    msg? :string
}


const follow = (from_user_id :string ,to_user_id :string ,token :string) => {
    return new Promise<IAJAXFollow>((resolve ,reject) => {
        axios.post(host + '/v1/relation/follow',{
            fid :from_user_id,
            tid :to_user_id
        },{headers :{ authorization : token ,aud :from_user_id }}).then((request) => {
            resolve(request.data);           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const isfollow = (from_user_id :string ,to_user_id :string) => {
    return new Promise<IAJAXFollow>((resolve ,reject) => {
        axios.get(host + '/v1/relation/isfollow',{
            params : { fid :from_user_id ,tid :to_user_id } 
        }).then((request) => {
            resolve(request.data);           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const fans = (to_user_id :string ,page :number = 1,size :number = 10) => {
    return new Promise<IAJAXRelationToFans>((resolve ,reject) => {
        axios.get(host + '/v1/relation/fans',{
            params : { id :to_user_id ,page ,size } 
        }).then((request) => {
            resolve(request.data);           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const stars = (from_user_id :string ,page :number = 1,size :number = 10) => {
    return new Promise<IAJAXRelationToStars>((resolve ,reject) => {
        axios.get(host + '/v1/relation/stars',{
            params : { id :from_user_id ,page ,size } 
        }).then((request) => {
            resolve(request.data);           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}


export default { 
    follow ,stars ,fans ,isfollow
}