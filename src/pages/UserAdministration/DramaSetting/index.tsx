import * as React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import UAHeader from '../../../components/UAHeader'
import Abstract from './Abstract'
import Chapter from './Chapter'
import Character from './Character'
import './index.less'

class DramaSettingPage extends React.Component<any,any> {

  constructor(props :any){
    super(props)
    this.state = {
      
    }
  }

  componentWillMount(){

  }
  
  render() {
    return (
      <div>
        <UAHeader data={[{value:'剧本管理'},{value:'设置剧本'}]} title="设置剧本" description="设置剧本的一些基本信息。"></UAHeader>
        <div className="bm-content card-container p16" style={{background:'#fff'}}>
          <Tabs defaultActiveKey="1" animated={false}>
            <TabPane tab="简介" key="1"><Abstract id={this.props.match.params.id} /></TabPane>
            <TabPane tab="人物小传" key="2"><Character id={this.props.match.params.id} /></TabPane>
            <TabPane tab="剧集" key="3"><Chapter id={this.props.match.params.id} /></TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect((state :any) :any => ({ UserReducer :state.UserReducer }))(Auth('user',DramaSettingPage))

