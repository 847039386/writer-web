import { IUser as IUserReducer } from '../../model' 

const UserReducer = (state = {  }, action :any) => {
    switch (action.type) {
        case 'SET_USER':
            let result = {}
            let userInfo :any = { }   
            if(action.payload.success){
                userInfo = action.payload.data;
                sessionStorage.setItem('user',JSON.stringify(action.payload))
                result = {...state, ...userInfo}
            }else{
                result = { }
            }    
            return result;
        case 'DESTROY_USER' :
            sessionStorage.removeItem('user');
            return { };
        default:
            return {...state};
    }
};


export { IUserReducer }
export default UserReducer