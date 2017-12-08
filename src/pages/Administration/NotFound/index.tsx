import * as React from 'react';
import { Button } from 'antd';
import './styles.less'
const ExceptionIMG = require('../../../public/img/exception.svg');
// const ExceptionIMG = require('../../../logo.svg')
class Exception extends React.Component<any,any> {

    render (){
        return (
            <div className={'exception'} style={{ minHeight: 500, height: '80%' }}>
                <div className={'imgBlock'}>
                    <div
                    className={'imgEle'}
                    style={{ backgroundImage: `url(${ExceptionIMG})` }}
                    />
                </div>
                <div className={'content'}>
                    <h1>{'404'}</h1>
                    <div className={'desc'}>{'抱歉，你访问的页面不存在'}</div>
                    <div className={'actions'}>
                        <Button type="primary">返回首页</Button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Exception
