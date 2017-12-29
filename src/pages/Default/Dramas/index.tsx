import * as React from 'react';
import { List ,Pagination ,Form ,Tag ,Card ,Spin } from 'antd';
const FormItem = Form.Item;
const { CheckableTag } = Tag;
import { Drama as DramaAjax ,Category ,Book } from '../../../axios'
import { IDrama ,IBook ,ICategory } from '../../../model'
import { Link } from 'react-router-dom'
import './index.css';

interface State {
  dramas : Array<IDrama>,
  dramasLoading : boolean,
  caboLoadding : boolean,
  books : Array<IBook>,
  categorys : Array<ICategory>,
  pagination :any,
  selectedBooks : Array<string>,
  selectedCategorys : Array<string>,
}


class DramasPage extends React.Component<any, State> {
  constructor(props :any) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      dramas : [],
      dramasLoading : false,
      caboLoadding :false,
      books :[],
      categorys :[],
      pagination :{ current :1 , onChange :this.onPageChange ,total : 0},
      selectedBooks : [],
      selectedCategorys : [],
    };
  }

  componentWillMount() {
    this.onSearch();
    this.getCategorys();
    this.getBooks();
  }

  onPageChange = (page :number) => {
    this.onSearch(page)
  }

  getCategorys = (page :number = 1 ,count :number = 999) => {
    this.setState({caboLoadding : true})
    Category.find(page,count).then(({ success ,data }) => {
        this.setState({caboLoadding : false})
        if(success && data ){
            this.setState({ categorys :data })
        }
    })
}

getBooks = (page :number = 1 ,count :number = 999) => {
    this.setState({caboLoadding : true})
    Book.find(page,count).then(({ success ,data }) => {
        this.setState({caboLoadding : false})
        if(success && data ){
            this.setState({ books :data })
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
    const { selectedBooks ,selectedCategorys } = this.state;
    const newTypes = type === 'db' ? selectedBooks : selectedCategorys
    const nextSelectedTags = checked ?
      [...newTypes, tag] :
      newTypes.filter((t :any) => t !== tag);
    if(type == 'db'){
      this.setState({ selectedBooks: nextSelectedTags },() => {
        this.onSearch()
      });
    }else{
      this.setState({ selectedCategorys: nextSelectedTags },() => {
        this.onSearch()
      });
    }
  }

  onSearch = (page :number = 1 ,size :number = 10) => {
    const { selectedBooks ,selectedCategorys } = this.state;
    let searchOptions = { };
    if(selectedBooks.length > 0){
        searchOptions = Object.assign(searchOptions,{ books : selectedBooks})
    }
    if(selectedCategorys.length > 0){
        searchOptions = Object.assign(searchOptions,{ categorys : selectedCategorys})
    }
    this.setState({dramasLoading : true})
    DramaAjax.search(searchOptions,page,size).then(({success ,data ,pagination}) => {
        this.setState({dramasLoading : false})
        if(success && pagination && data){
            this.setState({
                pagination : {
                    current : pagination.current,
                    total : pagination.total,
                    pageSize :pagination.size
                },
                dramas :data
            })
        }
    })
}
  

  render() {
    let { selectedBooks ,selectedCategorys } = this.state
    return (
      <div style={{background:'#fff'}} className={'p16'}>
        <Spin spinning={this.state.caboLoadding}>
          <Form>
            <FormItem style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}} labelCol={{span :2}} wrapperCol={{span:22}} label={'剧本类型：'}>
                {
                  this.state.books.map((book :IBook) => {
                    return (
                      <CheckableTag
                        key={book._id}
                        checked={selectedBooks.indexOf(book._id) > -1}
                        onChange={checked => this.handleChange(book._id, checked,'db')}>
                        {book.name}
                      </CheckableTag>
                    )
                  })
                }                            
            </FormItem >
            <FormItem style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}} labelCol={{span :2}} wrapperCol={{span:22}} label={'剧情类型：'}>
              {
                  this.state.categorys.map((category :ICategory) => {
                    return (
                      <CheckableTag
                        key={category._id}
                        checked={selectedCategorys.indexOf(category._id) > -1}
                        onChange={checked => this.handleChange(category._id, checked)}>
                        {category.name}
                      </CheckableTag>
                    )
                  })
                }               
            </FormItem >
          </Form>
        </Spin>
        {this.getList()}
      </div>
      
    );
  }
}

export default DramasPage

