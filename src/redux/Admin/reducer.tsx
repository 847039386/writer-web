const AdminReducer = (state = {  }, action :any) => {
    switch (action.type) {
        case 'SET_ADMIN':
            let result = {}
            let userInfo :any = { }   
            if(action.payload.success){
                userInfo = action.payload.data;
                sessionStorage.setItem('admin',JSON.stringify(action.payload))
                result = {...state, ...userInfo}
            }else{
                result = { }
            }    
            return result;
        case 'DESTROY_ADMIN' :
            sessionStorage.removeItem('admin');
            return { };
        default:
            return {...state};
    }
};

export default AdminReducer