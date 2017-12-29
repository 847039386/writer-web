import * as React from 'react';


class Auth extends React.Component<any,any> {
        ComponentPage : React.ReactNode = <div>没权限</div>;
        constructor(props :any){
            super(props)
        }
        componentWillMount(){
            let authStatus = false;
            const { authType ,AdminReducer , UserReducer ,ComponentPage } = this.props;
            
            if(authType === 'admin'){
                if(AdminReducer.token){
                    authStatus = true;
                }
            }else if(authType === 'user'){
                if(UserReducer.token){
                    authStatus = true;
                }
            }

            if(authStatus){
                this.ComponentPage = <ComponentPage {...this.props} />
            }else{
                location.replace('#/')
            }
        }
    
        render(){
            return this.ComponentPage;
        }
}

type AuthType = 'user' | 'admin'
export default function(authType :AuthType ,ComponentPage :any) : React.ComponentType {    
    return function(props :any){
        let newProps = { ...props ,...{ ComponentPage } ,...{ authType } }
        return <Auth { ...newProps } />
    }
}