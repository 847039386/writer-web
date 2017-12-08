import * as React from 'react';
import { Row ,Col ,Button ,Card ,Icon } from 'antd';
import UAHeader from '../../../components/UAHeader';
import { Drama as DramaAjax } from '../../../axios'
import { IDrama } from '../../../Models'
import './style.less'

interface State {
  dramas : Array<IDrama>
}

class UserHome extends React.Component<any,State> {

  constructor(props :any){
    super(props)
    this.state = {
      dramas : []
    }
  }

  componentWillMount(){
    DramaAjax.getDramasByUserID('id').then(({success ,data}) => {
       if(success && data){      
        this.setState({dramas :data})
       }
    })
  }

  createDrama(){
    location.replace("#/ua/cdrama");
  }



  render() {
    return (
      <div>
        <UAHeader data={[{value:'剧本管理'}]} title="剧本管理" description="快速的浏览" />      
        <div className="bm-content" >
           <Row gutter={16}>
              <Col span={8}>
                <Button onClick={this.createDrama} icon={"plus"} className={"ua-dramas-add"} type="dashed">添加剧本</Button>              
             </Col>             
             {
                this.state.dramas.map((drama :IDrama) : JSX.Element => {
                  return (
                    <Col key={drama.id} span={8}>  
                      <Card 
                        className={'ua-dramas-item'}
                        actions={[<Icon onClick={()=>{location.replace(`#/ua/drama/setting/${drama.id}`)}} type="edit" />, <Icon type="delete" />]}
                      >
                        <div className={'ua-dramas-item-body'}>
                          <div className={'ua-dramas-item-title'}>{drama.title}</div>
                          <div className={'ua-dramas-item-description'}>{drama.description}</div>
                        </div>
                        
                      </Card>
                    </Col>
                  )
                })
              }    
           </Row>
        </div>
      </div>
    );
  }
}

// import { connect } from 'react-redux'
export default (UserHome)

