interface LoginState {
    username : string ,     //用户名的双向绑定
    password :string,       //用户密码的双向绑定
    loading :boolean,     //登陆中显示加载模式
    loginState :boolean   //是否登陆状态
}

interface LoginProps {
  error?() : void,          //登陆失败时候操作
  success?() :void,           //登陆成功后操作
  onLogin?(username :string ,password :string) : void,     //reducer 通知全局方法
  User? :any,                                               //reducer User的存储对象
  card? : boolean,                                                 //'是否利用card包裹'
  className? :string                                              //  className 原装
}

export { LoginState ,LoginProps };
