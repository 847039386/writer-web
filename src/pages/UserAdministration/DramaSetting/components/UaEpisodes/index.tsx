import * as React from 'react';
import { Icon ,Popconfirm } from 'antd';

import './style.less'

interface Props {
    title :string,
    onSelected? :boolean;
    onTitle?(key? :any) :void,
    onUpdate?(key? :any) :void,
    onDelete?(key? :any) :void,
    onDeleteCancel?(key? :any) :void,
}

interface State {
    onSelected? :string
}

class Episodes extends React.Component<Props,State> {

  constructor(props :Props){
    super(props)
  }

  componentWillMount(){
    const { onSelected } = this.props
    this.setState({ onSelected : onSelected ? 'ua-episodes-group-selected' : '' })
  }

  componentWillReceiveProps(nextProps :Props){
    const { onSelected } = nextProps
    this.setState({ onSelected : onSelected ? 'ua-episodes-group-selected' : '' })
  }

  onTitle = (key :any) => {
    if(this.props.onTitle){
        this.props.onTitle(key)
    }
  }

  onUpdate = (key :any) => {
    if(this.props.onUpdate){
        this.props.onUpdate(key)
    }
  }

  onDelete = (key :any) => {
    if(this.props.onDelete){
        this.props.onDelete(key)
    }
  }

  onDeleteCancel = (key :any) => {
    if(this.props.onDeleteCancel){
        this.props.onDeleteCancel(key)
    }
  }
  
  render() {
    return (
        <div className={`ua-episodes-group ${this.state.onSelected}`}>
            <p className={`ua-episodes-group-title`} onClick={this.onTitle}>{this.props.title}</p>
            <p className="ua-episodes-group-btn" onClick={this.onUpdate}><Icon type="edit" /></p>
            <Popconfirm title="是否删除" okText="是" cancelText="否" onConfirm={this.onDelete} onCancel={this.onDeleteCancel}>                  
                <p className="ua-episodes-group-btn">              
                    <Icon type="delete" />
                </p>
            </Popconfirm>              
        </div>
    );
  }
}


export default Episodes

