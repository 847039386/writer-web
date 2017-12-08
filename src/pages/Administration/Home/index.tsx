import * as React from 'react';
import UAHeader from '../../../components/UAHeader'
import {  } from 'antd';
// const QueueAnim =  require('rc-queue-anim').default;
{/* <QueueAnim delay={300} className="queue-simple">
    <div key="a">依次进场</div>
    <div key="b">依次进场</div>
    <div key="c">依次进场</div>
    <div key="d">依次进场</div>
</QueueAnim> */}
class Home extends React.Component<any,any> {


    componentDidMount(){
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

export default Home
