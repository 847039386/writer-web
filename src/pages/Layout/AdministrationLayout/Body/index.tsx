import * as React from 'react';
import { Layout ,Avatar ,Button } from 'antd';
const { Content, Footer , Header } = Layout;
import './styles.less'

class AdminBody extends React.Component<any,any> {

    headerStyles : React.CSSProperties;
    constructor(props : any){
        super(props)
        this.headerStyles = {
            background : '#fff',
            padding: '0 12px 0 0',
            boxShadow :'0 1px 4px rgba(0, 21, 41, 0.08)',
        }
        this.state = {
            AdminReducer : {}
        }
        this.onLogout = this.onLogout.bind(this)
        
    }

    componentWillReceiveProps(nextProps :any){
        const { AdminReducer } = nextProps
        if(AdminReducer.token){
            this.setState({ AdminReducer })
        }
    }

    onLogout = () => {
        let { dispatch } = this.props;
        dispatch({type: "DESTROY_ADMIN"})
        location.replace('#/')
    }



    render(){
        return (
            <Layout style={{background:'#F0F2F5'}}>
                <Header style={this.headerStyles}>
                    <div className={'adm_header'}>
                        <Avatar style={{marginRight:10}} size="small" className={'avatar'} >管理员:</Avatar>
                        <span style={{marginRight:10}}>管理员</span>
                        <Button style={{marginRight:10}} size="small" type={'danger'} onClick={this.onLogout} >注销</Button>
                    </div>  
                </Header>
                <Content>   
                    <div style={{ minHeight: 720 ,marginTop:3 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' ,background:"#F0F2F5" }}>
                Ant Design ©2016 Created by Ant UED
                </Footer>
             </Layout>
        )
    }
}




export default AdminBody