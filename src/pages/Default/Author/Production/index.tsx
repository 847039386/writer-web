import * as React from 'react';
import { List ,Button ,Spin } from 'antd'
import { Drama as DramaAjax } from '../../../../axios'
import { Link } from 'react-router-dom'
import { IDrama } from '../../../../model'
import moment from '../../../../common/moment-cn'

interface State {
    Dramas :IDrama [],
    loading :boolean,
    loadingMore :boolean,
    showLoadingMore :boolean,
    pagination :any
}

interface Props {
  id :string,
}

class Production extends React.Component<Props,State> {

  constructor(props :Props){
    super(props)
    this.state = {
      Dramas : [],
      loading :false,
      loadingMore : false,
      showLoadingMore :false,
      pagination : { current : 1 }
    }
  }

  componentWillMount() {
    this.getDramas(this.props.id,1,{loading :true},{loading :false})
  }

  onLoadMore = () =>{
    this.getDramas(this.props.id,++this.state.pagination.current,{loadingMore :true},{loadingMore :false})
  }

  getDramas = (id :string ,page : number,state :any ,end :any) => {
    this.setState(state)
    DramaAjax.getDramasByUserID(id ,page).then(({success ,data ,pagination}) => {
      this.setState(end)
      if(success && data && pagination){
        let max = Math.ceil(pagination.total/pagination.size)
        this.setState({ 
          Dramas :this.state.Dramas.concat(data),
          showLoadingMore :pagination.current < max,
          pagination : pagination
        })
      }
    })
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
        {
          this.state.loading ? <Spin style={{ width :'100%' }} tip={'加载中...'} /> :
          <List
            loadMore={loadMore}
            dataSource={this.state.Dramas}
            renderItem={(drama :IDrama) => (
              <List.Item  extra={''}>
                <List.Item.Meta
                  avatar={''}
                  title={<Link to={`/details/${drama._id}`}>{drama.title}</Link>}
                />
                {moment(drama.create_at).format('YYYY MMMM Do, h:mm:ss a')}
              </List.Item>
            )}
          />
        }
      </div>
      
    );
  }
}

export default Production;
