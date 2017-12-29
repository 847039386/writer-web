import * as React from 'react';
import UAHeader from '../../../components/UAHeader'

import {  } from 'antd';
class Home extends React.Component<any,any> {


    componentDidMount(){
        console.log('我是home',this.props)
        console.log()
    }

    render (){
        return (
            <div>
                <UAHeader data={[{value:'主页'}]} title="主页" description="快速的浏览" />      
                <div className="bm-content" >
                    
                </div>
            </div>
        )
    }

}


import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect(state => state)(Auth('admin',Home))
