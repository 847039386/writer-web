import * as React from 'react';
import { Card ,Icon ,Spin ,List ,Button } from 'antd';
import UAHeader from '../../../components/UAHeader';
import { Drama as DramaAjax } from '../../../axios'
import { IDrama } from '../../../Models'
import './style.less'

interface State {
  dramas : Array<IDrama>,
  loading :boolean,
  loadingMore :boolean ,
  showLoadingMore :boolean ,
  pagination :any
}

class UserHome extends React.Component<any,State> {

  constructor(props :any){
    super(props)
    this.state = {
      dramas : [],
      loading :false,
      loadingMore :false ,
      showLoadingMore :false,
      pagination : { current : 1 }
    }
  }

  componentWillMount(){
    const { UserReducer } = this.props;
    if(UserReducer.token){
      this.getDramas(this.props.id,1,{loading :true},{loading :false})
    }else{
      location.replace("#/");
    }
    
  }

  getDramas = (id :string ,page :number = 1, state :any , end :any) =>{
    this.setState(state)
    DramaAjax.getDramasByUserID(id ,page ,9).then(({success ,data ,pagination}) => {
      this.setState(end)
      if(success && data && pagination){
        let max = Math.ceil(pagination.total/pagination.size)      
        this.setState({dramas :this.state.dramas.concat(data) ,showLoadingMore :pagination.current < max ,pagination :pagination})
      }
   })
  }

  onLoadMore = () =>{
    this.getDramas(this.props.id,++this.state.pagination.current,{loadingMore :true},{loadingMore :false})
  }

  createDrama(){
    location.replace("#/ua/cdrama");
  }

  render() {
    const { loadingMore ,showLoadingMore } = this.state
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, lineHeight: '32px' }}>
        {loadingMore && <Spin tip={'数据加载中...'} />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多数据...</Button>}
      </div>
    ) : null;
    return (
      <div>
        <UAHeader data={[{value:'剧本管理'}]} title="剧本管理" description="快速的浏览" />      
        <div className="bm-content" >
            <Spin spinning={this.state.loading}> 
                  <List
                      loadMore={loadMore}
                      grid={{ gutter: 16, column: 3 }}
                      dataSource={this.state.dramas}
                      renderItem={(drama :any) => (
                        <List.Item>
                          <Card 
                            className={'ua-dramas-item'}
                            actions={[<Icon onClick={()=>{location.replace(`#/ua/drama/setting/${drama.id}`)}} type="edit" />, <Icon type="delete" />]}
                          >
                            <div className={'ua-dramas-item-body'}>
                              <div className={'ua-dramas-item-title'}>{drama.title}</div>
                              <div className={'ua-dramas-item-description'}>{drama.description}</div>
                            </div>
                          </Card>
                        </List.Item>
                      )}
                  />  
            </Spin>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux'
export default connect((state :any) => ({ UserReducer :state.UserReducer }))(UserHome)

