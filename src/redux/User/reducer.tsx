import { IUser as IUserReducer } from '../../Models' 

const UserReducer = (state = {  }, action :any) => {
    switch (action.type) {
        case 'SET_USER':
            let userInfo = action.payload.success ? action.payload.data : { }             
            return {...state, ...userInfo};
        default:
            return {...state};
    }
};


export { IUserReducer }
export default UserReducer