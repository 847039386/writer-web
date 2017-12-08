
interface ILoginReducer {
    isFetching : boolean
}

const Login = {
    isFetching: true, 
    request : {},
}

const LoginReducer = (state = Login, action :any) => {
    switch (action.type) {
        //加载中
        case 'REQUEST_DATA':                
            return {...state, isFetching: true};
        //加载完毕    
        case 'RECEIVE_DATA':
            return {...state, isFetching: false, request: action.payload.request};
        default:
            return {...state};
    }
};

export { ILoginReducer }
export default LoginReducer