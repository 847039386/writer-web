import * as React from 'react';
import { Button } from 'antd';
import Result from '../../../components/Result';
import { parseQueryString } from '../../../common/util';
import { Link } from 'react-router-dom'




class UserResultPage extends React.Component<any,any> {

  constructor(props :any){
    super(props)
    this.state = {
      status :'',
      title : '',
      description :''      
    }
  }

  componentWillMount(){
    let query :any = parseQueryString(this.props.location.search);
    if(query.type && query.status){
      this.setTypeCDrama(query)
    }else{
      this.props.history.push({ pathname: '/' })
    }
  }

  setTypeCDrama = (query :any) => {
    let result = { };
    let actions :React.ReactNode = '';
    if(query.type == 'cdrama'){
      if(query.status === 'success' && query.id){
        actions = <div><Link to={`/ua/drama/setting/${query.id}`}><Button type='primary' >填写信息</Button></Link>&nbsp;&nbsp;&nbsp;<Link to='/'><Button>返回主页</Button></Link></div>;
        result = Object.assign(result ,{status :'success' ,title :'成功' ,description :'恭喜您成功创建剧本，接下来请填写剧本的详情信息。' ,actions} )
      }else{
        actions = <div><Link to={`/ua/cdrama`}><Button type='primary' >继续创建</Button></Link>&nbsp;&nbsp;&nbsp;<Link to='/'><Button>返回主页</Button></Link></div>
        result = Object.assign(result ,{status :'error' ,title :'失败' ,actions} )
      }
    }
    this.setState(result)
  }



  
  render() {
    return (
      <div>
        <div className="bm-content" >
            <Result type={this.state.status} title={this.state.title} description={this.state.description} actions={this.state.actions} />
        </div>
      </div>
    );
  }
}

export default UserResultPage

