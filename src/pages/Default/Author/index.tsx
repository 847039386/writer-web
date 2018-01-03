import * as React from 'react';
import { Button , Tabs ,Avatar ,Row ,Col ,Card ,message } from 'antd';
import Seiri from '../../../components/Seiri'
import { UserState ,UserModel } from './constraint'
import Production from './Production'
import FansComponent from './Fans'
import { User as UserAjax } from '../../../axios'
import { Relation } from '../../../axios'
import './index.less'



class AuthorPage extends React.Component<any,UserState> {
  constructor(props :any){
    super(props)
    
    this.state = {
      User : new UserModel(),
      loading :false,
      isFollow :false,
      isFollowERROR :true,
      isFollowLoading :false
    }

    this.follow = this.follow.bind(this);
  }

  componentWillMount() {
    const { UserReducer ,match} = this.props;
    this.getUser(match.params.id)
    if(UserReducer._id && match.params.id && UserReducer._id != match.params.id){
        this.isFollow(UserReducer._id,match.params.id)
    }
  }

  componentWillReceiveProps(nextProps :any){
    const { UserReducer ,match } = nextProps;
    this.getUser(match.params.id)
    if(UserReducer._id && match.params.id && UserReducer._id != match.params.id){
      this.isFollow(UserReducer._id,match.params.id)
    }
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

  isFollow = (fid :string ,tid :string) => {
    this.setState({ isFollowLoading :true })
    Relation.isfollow(fid,tid).then(({ success ,data ,msg }) => {
      this.setState({ isFollowLoading :false })
      if(success){
        this.setState({ isFollowERROR :false})
        if(data){
          this.setState({ isFollow :true })
        }else{
          this.setState({ isFollow :false })
        }
      }else{
        
        message.error(`获取失败，原因可能是：${msg}`)
      }
    })
  }

  follow = () => {
    const { UserReducer ,match} = this.props;
    this.setState({ isFollowERROR :true })
    Relation.follow(UserReducer._id,match.params.id,UserReducer.token).then(({ success ,data ,msg }) => {
      this.setState({ isFollowERROR :false})
      if(success){
        console.log(data);
        if(data){
          this.setState({ isFollow :true })
        }else{
          this.setState({ isFollow :false })
        }
      }else{
        message.error(`获取失败，原因可能是：${msg}`)
      }
    })
  }

  


  render() {
    return (  
        <Card loading ={this.state.loading} style={{minHeight :'85vh'}}>
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
            {
              this.props.UserReducer._id && this.props.UserReducer._id !== this.props.match.params.id ?
              <Col xs={2} sm={4} md={4}  >
                <div style={{height:66 ,textAlign:'center' ,display:'flex'}}>
                  <div style={{ margin :'auto' }}>
                    <Button disabled={ this.state.isFollowLoading || this.state.isFollowERROR }
                    onClick={this.follow}
                     type="primary" >{ this.state.isFollow ? '取消关注' : '关注' }
                     </Button>  
                  </div>
                </div>
              </Col> : ''
            }
          </Row>
          <Tabs defaultActiveKey="1" animated={false}>
            <Tabs.TabPane tab="作者介绍" key="1">
                <Seiri onlyMD value={this.state.User.presentation || '该用户并没有留下任何简介'} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="粉丝" key="2">
                <FansComponent id={this.props.match.params.id} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="他的关注" key="3">
                <FansComponent id={this.props.match.params.id} type={'stars'} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="作品" key="4">
                <Production id={this.props.match.params.id} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
    );
  }
}


import { connect } from 'react-redux'
export default connect((state :any) :any => ({ UserReducer :state.UserReducer }))(AuthorPage);
