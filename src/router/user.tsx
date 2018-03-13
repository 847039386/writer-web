import * as React from 'react';
import { Route ,Switch } from 'react-router-dom';
import UserAdministrationLayout from '../pages/Layout/UserAdministrationLayout'
import Loadable from 'react-loadable';
import { Spin } from 'antd'

const MyLoadingComponent = () => {
    return <Spin style={{ width :'100%' }} tip="页面加载中..." />;
}

const UserHome = Loadable({
    loader: () => import('../pages/UserAdministration/Home/index'),
    loading: MyLoadingComponent
});

const UserCreateDrama = Loadable({
    loader: () => import('../pages/UserAdministration/CreateDrama/index'),
    loading: MyLoadingComponent
});

const UserDramaSetting = Loadable({
    loader: () => import('../pages/UserAdministration/DramaSetting/index'),
    loading: MyLoadingComponent
});

const UserDramas = Loadable({
    loader: () => import('../pages/UserAdministration/Dramas/index'),
    loading: MyLoadingComponent
});

const UserSettingInfo = Loadable({
    loader: () => import('../pages/UserAdministration/Setting/Info/index'),
    loading: MyLoadingComponent
});



const UserPresentation = Loadable({
    loader: () => import('../pages/UserAdministration/Setting/Presentation/index'),
    loading: MyLoadingComponent
});

const Result = Loadable({
    loader: () => import('../pages/UserAdministration/Result/index'),
    loading: MyLoadingComponent
});


const Notify = Loadable({
    loader: () => import('../pages/UserAdministration/Notify/index'),
    loading: MyLoadingComponent
});

const NotFound = Loadable({
    loader: () => import('../pages/NotFound/index'),
    loading: MyLoadingComponent
});

const UserRoute = (rote :any) => {
    return (
            <UserAdministrationLayout>
                <Switch>              
                    <Route exact path={`${rote.match.url}`} component={UserHome}/>
                    <Route exact path={`${rote.match.url}/cdrama`} component={UserCreateDrama}/>
                    <Route exact path={`${rote.match.url}/rs`} component={Result}/>
                    <Route exact path={`${rote.match.url}/dramas`} component={UserDramas}/>
                    <Route exact path={`${rote.match.url}/notify`} component={Notify}/>
                    <Route exact path={`${rote.match.url}/drama/setting/:id`} component={UserDramaSetting}/>
                    <Route exact path={`${rote.match.url}/setting/presentation`} component={UserPresentation}/>   
                    <Route exact path={`${rote.match.url}/setting/info`} component={UserSettingInfo}/>  
                    <Route path="*" component={NotFound} />
                </Switch>                     
            </UserAdministrationLayout>
    )  
}

export default UserRoute