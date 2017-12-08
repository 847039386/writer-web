import * as React from 'react';
import { Icon } from 'antd';
import './styles.less'
type ic = 'success' | 'error'
interface Props {
    type : ic,
    title :string,
    description? :string
    actions? :React.ReactNode
}


class ResultMsg extends React.Component<Props,any> {

    constructor(props : Props){
        super(props);  
    }

    componentWillMount(){
        
    }


    render(){
        const iconMap = {
            error: <Icon className={'error'} type="close-circle" />,
            success: <Icon className={'success'} type="check-circle" />,
        };

        return (
            <div className={'result'} >
                <div className={'icon'}>{iconMap[this.props.type]}</div>
                <div className={'title'}>{this.props.title}</div>
                {this.props.description && <div className={'description'}>{this.props.description}</div>}
                {this.props.children && <div className={'extra'}>{this.props.children}</div>}
                {this.props.actions && <div className={'actions'}>{this.props.actions}</div>}
            </div>
        )
    }
}




export default ResultMsg