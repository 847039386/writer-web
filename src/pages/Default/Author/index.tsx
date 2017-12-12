import * as React from 'react';
import { Button , Tabs ,Avatar ,Row ,Col ,Spin } from 'antd'
import { UserState ,UserModel } from './constraint'
import Presentation from './Presentation'
import Production from './Production'
import { User as UserAjax } from '../../../axios'
import './index.less'

class AuthorPage extends React.Component<any,UserState> {
  constructor(props :any){
    super(props)
    
    this.state = {
      User : new UserModel(),
      loading :false
    }
  }

  componentWillMount() {
    this.getUser(this.props.match.params.id)
  }

  getUser = (id :string) => {
    this.setState({loading :true })
    UserAjax.getUserById(id).then(({success ,data}) => {
      this.setState({loading :false })
      if(success && data){
        this.setState({
          User :data
        })
      }
    })
  }


  render() {
    return (  
        <Spin spinning={this.state.loading}>
          <Row style={{margin :'20px 0'}}>
            <Col xs={2} sm={4} md={4} style={{height:66}}>
              <div style={{height:66 ,textAlign:'center' ,display:'flex'}}>
                <div style={{ margin :'auto' }}>
                  <Avatar size="large" src={this.state.User.avatar} />
                  <br />
                  作者：{this.state.User.name}
                </div>
              </div>
            </Col>
            <Col xs={2} sm={4} md={4}  >
              <div style={{height:66 ,textAlign:'center' ,display:'flex'}}>
                <div style={{ margin :'auto' }}>
                  <Button type="primary" >关注</Button>&nbsp;&nbsp;
                  <Button type="primary" >站内信</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" >
            <Tabs.TabPane tab="作者介绍" key="1">
                <Presentation id={this.props.match.params.id} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="作品" key="2">
                <Production  id={this.props.match.params.id} />
            </Tabs.TabPane>
          </Tabs>
        </Spin>
    );
  }
}

export default AuthorPage
