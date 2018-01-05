import axios from 'axios';
import Conf from '../conf'
const host = Conf.host || 'http://test.com/'


interface IAJAXADDLike {
    data? :any,
    success :boolean,
    msg? :string
}

interface IAJAXLike {
    data? :boolean,
    success :boolean,
    msg? :string
}


const addLike = (drama_id :string ,user_id :string ,token :string) => {
    return new Promise<IAJAXADDLike>((resolve ,reject) => {
        axios.post(host + '/dlike/ct',{
            did :drama_id,
            uid :user_id
        },{headers :{ authorization : token ,aud :user_id }}).then((request) => {
            resolve(request.data);           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

const isLike = (drama_id :string ,user_id :string) => {
    return new Promise<IAJAXLike>((resolve ,reject) => {
        axios.get(host + '/dlike/is',{
            params : { did :drama_id ,uid :user_id } 
        }).then((request) => {
            resolve(request.data);           
        }).catch((err) => {
            resolve({success :false ,msg :err.message })
        })
    }) 
}

export default { 
    addLike ,isLike
}