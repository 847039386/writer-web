
//判断用户是否登陆
const isLogin = (User :any) :boolean =>{
    if(User && !User.isFetching && User.request.success){
        return true;
    }else{
        return false;
    }
}

export { isLogin }