import * as React from 'react';
import { Route ,Switch } from 'react-router-dom';
import DefaultLayout from '../pages/Layout/DefaultLayout/index'
import Loadable from 'react-loadable';
import { Spin } from 'antd'

const MyLoadingComponent = () => {
    return <Spin style={{ width :'100%' }} tip="页面加载中..." />;
}

const HomePage = Loadable({
    loader: () => import('../pages/Default/Home/index'),
    loading: MyLoadingComponent
});

const DramasPage = Loadable({
    loader: () => import('../pages/Default/Dramas/index'),
    loading: MyLoadingComponent
});

const DetailsPage = Loadable({
    loader: () => import('../pages/Default/Details/index'),
    loading: MyLoadingComponent
});

const AuthorPage = Loadable({
    loader: () => import('../pages/Default/Author/index'),
    loading: MyLoadingComponent
});

const Topic = Loadable({
    loader: () => import('../pages/Default/Topic/index'),
    loading: MyLoadingComponent
});

const Topics = Loadable({
    loader: () => import('../pages/Default/Topics/index'),
    loading: MyLoadingComponent
});

const NotFound = Loadable({
    loader: () => import('../pages/NotFound/index'),
    loading: MyLoadingComponent
});


const DefaultRoute = (rote :any) => {
    return (
            <DefaultLayout>
                <Switch>
                    <Route exact path={`${rote.match.url}`} component={HomePage}/>
                    <Route exact path={`${rote.match.url}details/:id`} component={DetailsPage}/>
                    <Route exact path={`${rote.match.url}dramas`} component={DramasPage}/>  
                    <Route exact path={`${rote.match.url}topic/:id`} component={Topic}/>   
                    <Route exact path={`${rote.match.url}topics`} component={Topics}/>                    
                    <Route exact path={`${rote.match.url}author/:id`} component={AuthorPage} />        
                    <Route path="*" component={NotFound} />
                </Switch>                     
            </DefaultLayout>
    )  
}

export default DefaultRoute