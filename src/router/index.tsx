import * as React from 'react';
import { HashRouter as Router ,Route ,Switch } from 'react-router-dom';

import DefaultRoute from './default'
import UserRoute from './user'
import AdminRoute from './admin'
import Login from '../pages/Login'

//这里因为 route4 Switch 特性 所以/recommend 必须要在 /上面。。除非用Redirect 指向/ 
class CRouter extends React.Component<any,any> {
    constructor(props :any){
        super(props);
    }
    render() {
        return (
            <Router >              
                <Switch>
                    <Route path={`/login`} component={Login} />  
                    <Route path={`/admin`} component={AdminRoute}/>
                    <Route path={`/ua`} component={UserRoute}/>
                    <Route path={`/`} component={DefaultRoute} />                                                 
                </Switch>
            </Router>
        )
    }

}


export default CRouter