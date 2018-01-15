import * as React from 'react';
import { Alert  ,Icon ,Spin ,Tabs } from 'antd';
import { User } from '../../../../axios';
import UAHeader from '../../../../components/UAHeader';
import UserBindPage from './user';
import EmailBindPage from './email';
import QQBindPage from './qq';
import UserInfoBindPage from './userInfo'
const TabPane = Tabs.TabPane;

interface State {
  loginStatus :Array<any>;
  loginStatusLoading :boolean;
  loginStatusSuccess :boolean;
}

class UserSettingInfoPage extends React.Component<any,State> {
  userID :string; 
  userToken :string;
  constructor(props :any){
    super(props)
    const { UserReducer } = props;
    this.userID = UserReducer._id;
    this.userToken = UserReducer.token;
    this.state = {
      loginStatus :[
        { idx : 0, identity_type : 'email'  ,icon :'mail' ,_id :'ic_email' ,title :'电子邮箱'},
        { idx : 1, identity_type : 'username'  ,icon :'user' ,_id :'ic _user' ,title :'本站用户名'},
        { idx : 2, identity_type : 'qq' ,icon :'qq' ,_id :'ic_qq' , title :'QQ'},
      ],
      loginStatusLoading :false,
      loginStatusSuccess :false
    }


  }

  componentWillMount(){
    this.getUserBindStatus();
  }
  
  getUserBindStatus = () => {
    this.setState({loginStatusLoading :true})
    User.userBindStatus(this.userID,this.userToken).then(({ success ,msg ,data}) => {
      this.setState({loginStatusLoading :false})
      if(success && data){
        let newAllUserLoginStatus = this.state.loginStatus;
        data.forEach((uStatus) => {
          newAllUserLoginStatus = newAllUserLoginStatus.map((nus :any) =>{
            if(nus.identity_type === uStatus.identity_type){
              return Object.assign(nus ,uStatus)
            }else{
              return nus
            }
          })  
          this.setState({loginStatus :newAllUserLoginStatus ,loginStatusSuccess :true})
        })
      }
    })
  }

  render() {
    return (
      <div>
        <UAHeader data={[{value:'设置'}]} title="安全设置" />      
        {
          this.state.loginStatusLoading ? <div style={{textAlign:'center' ,margin:'30px 0'}}><Spin tip={'安全信息加载中...'} /></div> :
          <div className="bm-content" >
              <Alert description="用户绑定的登陆信息,红为未绑定。点击图标进行绑定" message={
                <div>当前绑定：
                  {
                    this.state.loginStatus.map((nus) => {
                      return <Icon key={nus._id} style={{ marginRight:5, fontSize: 20, cursor:'pointer' ,color: nus.identifier ? '#52c41a' : '#f5222d' }}  type={nus.icon} />
                    })
                  }
                  <br/>
                </div>
              } style={{marginBottom :20}} />
              <div style={{padding :20}}>
                {
                  this.state.loginStatusSuccess ? 
                  <div>
                      <Tabs type="card">
                        <TabPane tab="配置信息" key="1">
                          {
                            this.state.loginStatus.map((nus) => {
                              return (
                                <p key={nus._id}>
                                  {`${nus.title}：`}<span style={{color: nus.identifier ? '#52c41a' : '#f5222d'}}>{nus.identifier ? '已绑定' : '未绑定'}</span>
                                </p>
                              )
                            })
                          }
                        </TabPane>
                        <TabPane tab="邮箱设置" key="2">
                          <EmailBindPage uid={this.props.UserReducer._id} token={this.props.UserReducer.token} identifier={this.state.loginStatus[0].identifier} />
                        </TabPane>
                        <TabPane tab="用户名设置" key="3">
                          <UserBindPage uid={this.props.UserReducer._id} token={this.props.UserReducer.token} identifier={this.state.loginStatus[1].identifier} />
                        </TabPane>
                        <TabPane tab="QQ绑定" key="4">
                          <QQBindPage uid={this.props.UserReducer._id} identifier={this.state.loginStatus[2].identifier} />
                        </TabPane>
                        <TabPane tab="修改信息" key="5">
                          <UserInfoBindPage uid={this.props.UserReducer._id} token={this.props.UserReducer.token} />
                        </TabPane>
                      </Tabs>
                  </div> : ''
                }
              </div>
          </div>
        }
      </div>
    );
  }
}

import { connect } from 'react-redux'
import Auth from '../../../../components/Auth'
export default connect((state :any) :any => ({ UserReducer :state.UserReducer }))(Auth('user',UserSettingInfoPage))

{/* <EmailBindPage uid={this.props.UserReducer._id} token={this.props.UserReducer.token} email={this.state.allUserLoginStatus[0].identifier} /> */}