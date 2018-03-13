import * as React from 'react';
import DocumentTitle from 'react-document-title';
import './styles.less';
import { Link } from 'react-router-dom'
import { Form ,Tabs } from 'antd';
import ADMLogin from './Login'
import ADMRegister from './Register'
class LoginComponent extends React.Component<any,any> {
    count_down :number;
    constructor (props :any) {
        super(props)
    }

    
    render (){
        return (
            <DocumentTitle title={'登陆'} >
                <div className={'container'}>
                    <div className={'top'}>
                        <div className={'header'}>
                        <Link to="/">
                            <img alt="" className={'logo'} src={'/images/favicon.ico'} />
                            <span className={'title'}>北门中文网</span>
                        </Link>
                        </div>
                        <p className={'desc'}>北门中文网 - 一个编剧汇集的地方。</p>
                    </div>
                    <div className={'main'}>
                        <Tabs className={'tabs'} animated={false}>
                            <Tabs.TabPane  tab="登陆" key="onLogin">
                                <ADMLogin />
                            </Tabs.TabPane>
                            <Tabs.TabPane  tab="注册" key="onRegister">
                                <ADMRegister />
                            </Tabs.TabPane>
                        </Tabs> 
                              
                    </div>
                </div>
            </DocumentTitle>
        )
    }

}

// export default Form.create()(LoginComponent)

import { connect } from 'react-redux'
import { adminLogin } from '../../redux/Login'
import { bindActionCreators } from 'redux';

export default connect((state :any ) :any => ({
    AdminReducer : state.AdminReducer
}),dispatch => ({
    adminLogin: bindActionCreators(adminLogin, dispatch),
    dispatch :dispatch
}))(Form.create()(LoginComponent));


