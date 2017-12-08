import { combineReducers } from 'redux';
import { LoginReducer ,ILoginReducer } from './Login'
import { ConfigReducer ,IConfigReducer } from './Config'
import { UserReducer , IUserReducer} from './User'


interface IReducer {
    LoginReducer? :ILoginReducer,
    ConfigReducer? :IConfigReducer
    UserReducer? :IUserReducer
}


export default combineReducers({
    LoginReducer,
    ConfigReducer,
    UserReducer,
});

export { IReducer }

