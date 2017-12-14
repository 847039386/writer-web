import { User as UserAjax } from '../../axios';

const requestData = () => ({
    type: 'REQUEST_DATA',
});
const receiveData = (request :any) => ({
    type: "RECEIVE_DATA",
    payload : {
       request,       
    }
});


// 登陆
const onLogin = (email :string ,password :string) => (dispatch :any) => {
    dispatch(requestData());
    return UserAjax.Login(email,password).then(resquest => {
        dispatch(receiveData(resquest))          //将登陆状态改变为登陆结束
        if(resquest.success){
            dispatch({
                type :'SET_USER' 
                ,payload : resquest
            })    //将用户信息记录到User上
        }
    });
};

// 注册
const onRegister = (nickname :string ,email :string ,password :string) => (dispatch :any) => {
    dispatch(requestData());
    return UserAjax.Register(nickname,email,password).then(resquest => {
        dispatch(receiveData(resquest))          //将登陆状态改变为登陆结束
        if(resquest.success){
            dispatch({
                type :'SET_USER' 
                ,payload : resquest
            })    //将用户信息记录到User上
        }
    });
};


export { onLogin ,onRegister } 


