import * as React from 'react';
import { Row, Col } from 'antd';
import RankCard from '../../../components/RankCard'
import ImgRankCard from '../../../components/ImgRankCard'
import CardTopics from '../../../components/CardTopics'
import LoginComponent from '../../../components/Login'
import { HomeState } from './constraint'
import './index.less'

class HomePage extends React.Component<any, HomeState> {
  constructor(props :any) {
    super(props);
    this.state = { 
      User : {},
      loading : false,
    }
    //设置LoginComponent的参数
    LoginComponent.defaultProps = {
      card :true,
    }
  }

  componentWillReceiveProps(nextProps :any) {
    console.log(nextProps ,'home')
  }


  render() {
    return (
        <div className="home">
          <Row gutter={16}>
            <Col lg={4} sm={24} xs={24}>
              <Row>
                <Col style={{marginBottom:10}}><RankCard url='http://dramaBook?count=5' title="最佳排行榜" /></Col>
                <Col style={{marginBottom:10}}><ImgRankCard more="/classify" url="http://screenwriters?count=5" title="最佳编剧" /></Col>
              </Row>
            </Col>
            <Col lg={16} sm={24} xs={24}>
              <Row>
                <Col style={{marginBottom:10}}><CardTopics url="http://topics?count=5" title="站内文章" /></Col>
              </Row>
            </Col>
            <Col lg={4} sm={24} xs={24}>
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