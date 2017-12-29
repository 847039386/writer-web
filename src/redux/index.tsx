import { combineReducers } from 'redux';
import { LoginReducer ,ILoginReducer } from './Login'
import { ConfigReducer ,IConfigReducer } from './Config'
import { UserReducer , IUserReducer} from './User'
import { AdminReducer } from './Admin'


interface IReducer {
    LoginReducer? :ILoginReducer,
    ConfigReducer? :IConfigReducer
    UserReducer? :IUserReducer
}


export default combineReducers({
    LoginReducer,
    ConfigReducer,
    UserReducer,
    AdminReducer
});

export { IReducer }

