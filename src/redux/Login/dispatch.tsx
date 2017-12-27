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
    return UserAjax.HOSTLogin(email,password).then(request => {
        dispatch(receiveData(request))          //将登陆状态改变为登陆结束
        if(request.success){
            dispatch({
                type :'SET_USER' 
                ,payload : request
            })    //将用户信息记录到User上
        }
    });
};

// 注册
const onRegister = (nickname :string ,email :string ,password :string) => (dispatch :any) => {
    dispatch(requestData());
    return UserAjax.HOSTRegister(nickname,email,password).then(request => {
        dispatch(receiveData(request))          //将登陆状态改变为登陆结束
        if(request.success){
            dispatch({
                type :'SET_USER' 
                ,payload : request
            })    //将用户信息记录到User上
        }
    });
};

// qq登陆

const qqLogin = (code :string) => (dispatch :any) => {
    return UserAjax.qqLogin(code).then(request => {
        console.log(request)
        if(request.success){
            dispatch({
                type :'SET_USER' 
                ,payload : request
            })
        }else{
            dispatch({
                type :'SET_USER' 
                ,payload : { success :false }
            })
        }
    }) 
}

const storageLogin = () => (dispatch :any)  => {
    return UserAjax.storageLogin().then(request => {
        if(request.success){
            dispatch({
                type :'SET_USER' 
                ,payload : request
            })
        }
    })
}




export { onLogin ,onRegister ,qqLogin ,storageLogin } 


