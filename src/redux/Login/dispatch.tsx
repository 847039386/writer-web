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
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
const onLogin = (username :string ,password :string) => (dispatch :any) => {
    dispatch(requestData());
    return UserAjax.Login(username,password).then(resquest => {
        dispatch(receiveData(resquest))          //将登陆状态改变为登陆结束
        if(resquest.success){
            dispatch({
                type :'SET_USER' 
                ,payload : resquest
            })    //将用户信息记录到User上
        }
        
    });
};

export { onLogin } 


