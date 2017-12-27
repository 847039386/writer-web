import * as React from 'react';
import { List ,Pagination ,Form ,Tag ,Card } from 'antd';
const FormItem = Form.Item;
const { CheckableTag } = Tag;
import { Drama as DramaAjax } from '../../../axios'
import { IDrama } from '../../../model'
import { Link } from 'react-router-dom'
import './index.css';

class DramasPage extends React.Component<any, any> {
  dramaType : Array<any>;   //剧情类型
  dramaBookType :Array<any>;  //剧本类型
  constructor(props :any) {
    super(props);
    this.dramaType = [ '搞笑' ,'战争' ,'军事']
    this.dramaBookType = [ '电影' , '电视剧' ]
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      dramas : [],
      dramasLoading : false,
      pagination :{ current :1 , onChange :this.onPageChange ,total : 0},
      selectedDramaType : [],
      selectedDramaBookType : [],
    };
  }

  componentWillMount() {
    this.getDramas();
  }

  onPageChange = (page :number) => {
    this.getDramas(page)
  }

  getDramas = (page :number = 1 ,count :number = 10) => {
    this.setState({dramasLoading :true})
    DramaAjax.getDramas(page,count).then(({success ,data ,pagination}) => {
      this.setState({dramasLoading :false})
      if(success && data && pagination) {
        this.setState({ dramas:data ,pagination :{total :pagination.total ,current :pagination.current }  })
      }
    })
  }

  getList = () => {
    return (
      <List
        loading={this.state.dramasLoading}
        grid={{ gutter: 16, lg: 6 ,xs :1 ,md :3 }}
        footer={ <Pagination style={{textAlign:'center'}} current={this.state.pagination.current} total={this.state.pagination.total} onChange={this.onPageChange} />}
        dataSource={this.state.dramas}
        renderItem={(drama :IDrama) => (
          <List.Item  extra={''} style={{border :0}} >
            <Card>
              <Card.Meta
                title={<Link to={`/details/${drama._id}`}>{drama.title}</Link>}
                description={ 
                  drama.category_id.length > 0 ? drama.category_id.map((category) => {
                    return ( <span key={category._id}>{category.name}&nbsp;</span> )
                  }) : <span>其他&nbsp;</span>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    )
  }

  handleChange(tag :any, checked :any ,type? :string) {
    const { selectedDramaBookType ,selectedDramaType } = this.state;
    const newTypes = type === 'db' ? selectedDramaBookType : selectedDramaType
    const nextSelectedTags = checked ?
      [...newTypes, tag] :
      newTypes.filter((t :any) => t !== tag);
    if(type == 'db'){
      this.setState({ selectedDramaBookType: nextSelectedTags },() => {
        console.log('selectedDramaBookType',this.state.selectedDramaBookType)
      });
    }else{
      this.setState({ selectedDramaType: nextSelectedTags },() => {
        console.log('selectedDramaType',this.state.selectedDramaType)
      });
    }
  }
  

  render() {
    let { selectedDramaBookType ,selectedDramaType } = this.state
    return (
      <div style={{background:'#fff'}} className={'p16'}>
        <Form>
          <FormItem style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}} labelCol={{span :2}} wrapperCol={{span:22}} label={'剧本类型：'}>
              {
                this.dramaBookType.map((tag :any) => {
                  return (
                    <CheckableTag
                      key={tag}
                      checked={selectedDramaBookType.indexOf(tag) > -1}
                      onChange={checked => this.handleChange(tag, checked,'db')}>
                      {tag}
                    </CheckableTag>
                  )
                })
              }                            
          </FormItem >
          <FormItem style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}} labelCol={{span :2}} wrapperCol={{span:22}} label={'剧情类型：'}>
            {
                this.dramaType.map((tag :any) => {
                  return (
                    <CheckableTag
                      key={tag}
                      checked={selectedDramaType.indexOf(tag) > -1}
                      onChange={checked => this.handleChange(tag, checked)}>
                      {tag}
                    </CheckableTag>
                  )
                })
              }               
          </FormItem >
        </Form>
        {this.getList()}
      </div>
      
    );
  }
}

export default DramasPage

