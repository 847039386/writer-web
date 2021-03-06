import * as React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './index.css';

class App extends React.Component<any,any> {

  constructor(props :any){
    super(props)
    this.state = {
      theme : props.theme
    }
  }

  componentWillReceiveProps(nextProps :any){
    const { theme } = nextProps
    this.setState({ theme :theme })
  }

  

  render() {
    return (
        <div className={this.state.theme}>
          <Layout className="theme_CLayout">
            <Header />
            <Content>{this.props.children}</Content>
            <Footer />
          </Layout>
        </div>
    );
  }
}

import { connect } from 'react-redux'
export default connect((state :any) => ({ theme : state.ConfigReducer.theme }))(App)
