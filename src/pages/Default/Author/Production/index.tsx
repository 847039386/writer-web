import * as React from 'react';
import { Card } from 'antd'
import { DState } from './constraint'
import { Drama as DramaAjax } from '../../../../axios'
import { Link } from 'react-router-dom'
import './index.less'


class Production extends React.Component<any,DState> {

  constructor(props :any){
    super(props)
    this.state = {
      Dramas : []
    }
  }

  componentWillMount() {
    DramaAjax.getDramasByUserID('id').then(({success ,data}) => {
      if(success && data){
        this.setState({ Dramas : data })
      }
    })
  }


  render() {
    return (  
      <div className="production">
        {this.state.Dramas.map((drama) => {
          return (
              <Card key={drama.id} className="theme_CCard production_item"><Link to={`/details/${drama.id}`}>{drama.title}</Link></Card>
          )
        })}
        
      </div>  
    );
  }
}

export default Production;
