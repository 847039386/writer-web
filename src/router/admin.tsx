import * as React from 'react';
import { Route ,Switch } from 'react-router-dom';
import AdministrationLayout from '../pages/Layout/AdministrationLayout'
import Loadable from 'react-loadable';
import { Spin } from 'antd'

const MyLoadingComponent = () => {
    return <Spin style={{ width :'100%' }} tip="页面加载中..." />;
}

const Home = Loadable({
    loader: () => import('../pages/Administration/Home/index'),
    loading: MyLoadingComponent
});

const Dramas = Loadable({
    loader: () => import('../pages/Administration/Dramas/index'),
    loading: MyLoadingComponent
});

const CommentPage = Loadable({
    loader: () => import('../pages/Administration/Comment/index'),
    loading: MyLoadingComponent
});

const Topics = Loadable({
    loader: () => import('../pages/Administration/Topics/index'),
    loading: MyLoadingComponent
});

const NotFound = Loadable({
    loader: () => import('../pages/Administration/NotFound/index'),
    loading: MyLoadingComponent
});

const Topic = Loadable({
    loader: () => import('../pages/Administration/Topic/index'),
    loading: MyLoadingComponent
});

const Success = Loadable({
    loader: () => import('../pages/Administration/Result/Success/index'),
    loading: MyLoadingComponent
});

const Category = Loadable({
    loader: () => import('../pages/Administration/Category/index'),
    loading: MyLoadingComponent
});

const Book = Loadable({
    loader: () => import('../pages/Administration/Book/index'),
    loading: MyLoadingComponent
});

const AdminRoute = (rote :any) => {
    return (
            <AdministrationLayout>
                <Switch>              
                    <Route exact path={`${rote.match.url}`} component={Home}/>
                    <Route exact path={`${rote.match.url}/dramas`} component={Dramas}/>
                    <Route exact path={`${rote.match.url}/topics`} component={Topics}/>
                    <Route exact path={`${rote.match.url}/topic`} component={Topic}/>
                    <Route exact path={`${rote.match.url}/comment`} component={CommentPage}/>
                    <Route exact path={`${rote.match.url}/category`} component={Category}/>
                    <Route exact path={`${rote.match.url}/book`} component={Book}/>
                    <Route exact path={`${rote.match.url}/success/:type`} component={Success}/>
                    <Route path="*" component={NotFound} />
                </Switch>                     
            </AdministrationLayout>
    )  
}

export default AdminRoute