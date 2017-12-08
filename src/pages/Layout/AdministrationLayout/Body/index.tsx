import * as React from 'react';
import { Layout  } from 'antd';
const { Content, Footer , Header } = Layout;

class AdminBody extends React.Component<any,any> {

    headerStyles : React.CSSProperties;
    constructor(props : any){
        super(props)
        this.headerStyles = {
            background : '#fff',
            padding: '0 12px 0 0',
            boxShadow :'0 1px 4px rgba(0, 21, 41, 0.08)',
        }
    }

    render(){
        return (
            <Layout style={{background:'#F0F2F5'}}>
                <Header style={this.headerStyles}></Header>
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