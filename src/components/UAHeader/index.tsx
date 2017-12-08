import * as React from 'react';
import { Breadcrumb  } from 'antd';
import { BreadcrumbProps } from './constraint'
import { Link } from 'react-router-dom';
import './index.less'

class UAHeader extends React.Component<BreadcrumbProps,any> {

    constructor(props : BreadcrumbProps){
        super(props);
        
    }

    componentWillMount(){
        
    }

    getComponent () :JSX.Element {
        if(this.props.data && this.props.data.length > 0 || this.props.title || this.props.description ){
            return (
                <div className="ual_header">
                    <Breadcrumb style={{marginBottom:16}}>
                    {
                        (this.props.data || []).map((option :any ,idx :number) :any => {
                            if(option.link){
                                return (<Breadcrumb.Item key={'Breadcrumb'+idx}><Link to={option.link}>{option.value}</Link></Breadcrumb.Item>)
                            }else{
                                return (<Breadcrumb.Item key={'Breadcrumb'+idx}>{option.value}</Breadcrumb.Item>)
                            }  
                        })                              
                    }
                    </Breadcrumb>
                    { this.props.title ? <h1 style={{marginBottom :16 ,fontSize:20,fontWeight:500}}>{this.props.title}</h1> : <span></span>}
                    { this.props.description ? <p style={{marginBottom:16}}>{this.props.description}</p> :<span></span> }
                    { this.props.children }
                </div>
            )
        }else{
            return <span></span>
        }
    }

    render(){
        return this.getComponent()
    }
}




export default UAHeader