import * as React from 'react';
import { Avatar ,Button ,Spin } from 'antd'
import { Relation } from '../../../../axios'
import { Link } from 'react-router-dom'
import { IRelationToFans ,IRelationToStars } from '../../../../model'
import './styles.less'

interface State {
    fans :Array<IRelationToFans>,
    stars :Array<IRelationToStars>,
    loading :boolean,
    more :boolean
}

type DATAType = 'stars' | 'fans'

interface Props {
  id :string,
  type? :DATAType
}

class FansComponent extends React.Component<Props,State> {
  currentPage :number;  
  maxPage :number;
  constructor(props :Props){
    super(props)
    this.state = {
        fans :[],
        stars :[],
        loading :false,
        more :false    
    }
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentWillMount() {
    if(this.props.type === 'stars'){
        this.getStars(this.props.id);  
    }else{
        this.getFans(this.props.id);
    }
  }

  onLoadMore = () =>{
    if(this.props.type === 'stars'){
        this.getStars(this.props.id,this.currentPage+1);  
    }else{
        this.getFans(this.props.id,this.currentPage+1);
    }
  }

  getFans = (id :string ,page : number = 1,size :number =10) => {
    this.setState({loading :true})
    Relation.fans(id,page,size).then(({ success ,data ,pagination ,msg }) => {
        this.setState({loading :false})
        if(success && data && pagination){
            this.currentPage = pagination.current;
            this.maxPage = Math.ceil(pagination.total / pagination.size);
            this.setState({more : this.currentPage < this.maxPage})
            this.setState({ fans :this.state.fans.concat(data) })
        }
    })
  }

  getStars = (id :string ,page : number = 1,size :number =10) => {
    this.setState({loading :true})
    Relation.stars(id,page,size).then(({ success ,data ,pagination ,msg }) => {
        this.setState({loading :false})
        if(success && data && pagination){
            this.currentPage = pagination.current;
            this.maxPage = Math.ceil(pagination.total / pagination.size);
            this.setState({more : this.currentPage < this.maxPage})
            this.setState({ stars :this.state.stars.concat(data) })
        }
    })
  }



  getFansDom = () : React.ReactNode => {
    return (  
        <div>
            <ul className={'cop_fans'}>
              {
                  this.state.fans.map((user :IRelationToFans) => {
                      return (
                          <li key={user.from_user_id._id} >
                              <Avatar style={{width:100,height:100}} src={user.from_user_id.avatar} /><br />
                              <p className={'fansname'}>
                                  <Link to={`/author/${user.from_user_id._id}`} >{user.from_user_id.name}</Link>
                              </p>
                          </li> 
                      )
                  })
              }
          </ul>
          <div style={{ textAlign:'center' }}>
              {
                  this.state.loading ?
                  <Spin tip={'数据加载中...'} /> :
                  this.state.more ?
                  <Button onClick={this.onLoadMore}>
                      { this.state.more ? '加载更多' : '暂无数据'}
                  </Button> : ''
              }
          </div> 
        </div>
      );
  }

  getStarsDom = () : React.ReactNode => {
    return (  
        <div>
            <ul className={'cop_fans'}>
              {
                  this.state.stars.map((user :IRelationToStars) => {
                      return (
                          <li key={user.to_user_id._id} >
                              <Avatar style={{width:100,height:100}} src={user.to_user_id.avatar} /><br />
                              <p className={'fansname'}>
                                  <Link to={`/author/${user.to_user_id._id}`} >{user.to_user_id.name}</Link>
                              </p>
                          </li> 
                      )
                  })
              }
          </ul>
          <div style={{ textAlign:'center' }}>
              {
                  this.state.loading ?
                  <Spin tip={'数据加载中...'} /> :
                  this.state.more ?
                  <Button onClick={this.onLoadMore}>
                      { this.state.more ? '加载更多' : '暂无数据'}
                  </Button> : ''
              }
          </div> 
        </div>
      );
  }



  getResultDom = () : React.ReactNode => {
    if(this.props.type === 'stars'){
        return this.getStarsDom();
    }else{
        return this.getFansDom();
    }
  }


  render() {
    return this.getResultDom();
  }

}

export default FansComponent;
