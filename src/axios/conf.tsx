import axios from 'axios';
import { IDrama ,IUser ,ITopic } from '../Models'
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'



interface IAJAXHome {
    data? :{
        dramas : Array<IDrama>
        authors : Array<IUser>
        topics : Array<ITopic>
    },
    success : boolean,
    msg? : string,
}


/**
 * 获取home页面所需要的所有json
 */
const home = () => {
    return new Promise<IAJAXHome>((resolve ,reject) => {
        axios.get(host + 'cf/home').then((request) => {
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
    home,
}