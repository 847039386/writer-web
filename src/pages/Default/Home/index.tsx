import * as React from 'react';
import { Row, Col ,Card } from 'antd';
import LoginComponent from '../../../components/Login'
import ShortList from '../../../components/ShortList'
import { Conf } from '../../../axios'
import { IDrama ,IUser ,ITopic } from '../../../Models'
import { Link } from 'react-router-dom'
import './index.less'

interface State {
  authors :Array<IUser>,
  dramas  :Array<IDrama>,
  topics   :Array<ITopic>,
  loading  :boolean 
}

class HomePage extends React.Component<any, State> {
  constructor(props :any) {
    super(props);
    this.state = { 
      authors : [],
      dramas : [],
      topics : [],
      loading :true
    }
    //设置LoginComponent的参数
    LoginComponent.defaultProps = {
      card :true,
    }
  }

  componentWillMount(){
    Conf.home().then(({success ,data}) => {
      this.setState({loading :false})
      if(success && data){
        this.setState({ 
          dramas : data.dramas,
          authors : data.authors,
          topics  : data.topics,
        })
      }
    })
  }

  render() {
    return (
        <div className="home">
          <Row gutter={16}>
            <Col lg={6} sm={24} xs={24} md={12} xl={5} >
              <Row>
                <Col style={{marginBottom:10}}>
                    <Card loading={this.state.loading} title={'最佳排行榜'} bodyStyle={{ padding :'5px 10px'}} >
                      <ShortList type={'drama'} data={this.state.dramas}  />
                    </Card>
                </Col>
                <Col style={{marginBottom:10}}>
                    <Card loading={this.state.loading} title={'最佳编剧'} bodyStyle={{ padding :'5px 10px'}} >
                      <ShortList type={'author'} data={this.state.authors}  />
                    </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={12} sm={24} xs={24} md={12} xl={14} >
              <Row>
                <Col style={{marginBottom:10}}>
                    <Card extra={<Link to='/topics'>更多>></Link>} loading={this.state.loading} title={'站内文章'} bodyStyle={{ padding :'5px 10px'}} >
                      <ShortList type={'topic'} data={this.state.topics}  />
                    </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={6} sm={24} xs={24} md={12} xl={5} >
              <Row>
                <Col style={{marginBottom:10}} className="theme_CCard"><LoginComponent /></Col>
              </Row>
            </Col>
          </Row>
        </div>
    );
  }
}

export default HomePage;