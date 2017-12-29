import * as React from 'react';
import UAHeader from '../../../../components/UAHeader'
import Result from '../../../../components/Result'
import { Card } from 'antd';

class SuccessPage extends React.Component<any,any> {

    render (){
        return (
            <div>
                <UAHeader data={[{value:'主页'},{value:'密码修改'}]} />      
                <div className="bm-content" >               
                        <Card bordered={false}>
                            <Result 
                                title="密码修改成功" 
                                type="success" 
                                description="密码修改成功" />
                        </Card>
                </div>
            </div>
        )
    }

}


export default SuccessPage
