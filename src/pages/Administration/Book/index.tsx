import * as React from 'react';
import UAHeader from '../../../components/UAHeader'
import { Table, Input, Button ,Form ,Modal ,Popconfirm ,message ,Alert } from 'antd';
import { Book } from '../../../axios'

interface State {
  data :Array<any>,
  pagination : any,
  loading :boolean,
  label : string,
  visible :boolean,
  title? :string,
  opLoading :boolean,
  searchName? :string
}

class BookPage extends React.Component<any,State> {
    columns : Array<any>;
    status : string;
    upID :string;
    upName :string;
    upIndex :number;
    constructor(props :any) {
      super(props);
      this.columns = [{
        title: 'ID',
        dataIndex: '_id',
        width: '25%',
      }, {
        title: '名称',
        dataIndex: 'name',
        width: '25%',
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text :any, record :any ,index :number) => {
          return (
            <div className="editable-row-operations">
              <a onClick={() => this.edit(record ,index)}>修改</a>&nbsp;&nbsp;
              <Popconfirm placement="top" title={'是否删除'} onConfirm={() => { this.remove(record ,index) }} okText="确定" cancelText="取消">
                <a>删除</a>
              </Popconfirm> 
            </div>
          );
        },
      }];
      this.onPageChange = this.onPageChange.bind(this);
      this.cancel = this.cancel.bind(this);
      this.onLabelChange = this.onLabelChange.bind(this);
      this.state = { 
          data : [],
          pagination : { total : 0 ,onChange :this.onPageChange ,current :0},
          loading :false,
          label :'',
          visible :false,
          opLoading:false
      };
    }

    onPageChange = (page :number) => {
        if(this.state.searchName){
          this.handleSearch(this.state.searchName , page)
        }else{
          this.getBooks(page)
        }
        
    }



    componentWillMount () {
        this.getBooks()
    }

    getBooks = (currentPage :number = 1 ,pageSize :number = 10) => {
        this.setState({loading :true ,searchName :''})
        Book.find(currentPage,pageSize).then(({success ,data ,pagination}) => {
            this.setState({loading :false})
            if(success && data && pagination) {
                this.setState({data : data ,pagination : { total :pagination.total , current :pagination.current}})
            }
        })
    }

    handleRefresh(e :any) {
      this.getBooks()
    }

    handleSearch (value :string ,page :number = 1) {
      this.setState({loading :true ,searchName :value})
      Book.search(value , page).then(({success ,data ,pagination}) => {
        this.setState({loading :false})
        if(success && data && pagination) {
            this.setState({data : data ,pagination : { total :pagination.total , current :pagination.current}})
        }
      }) 
    }

    handleCreate = (e :any) =>{
       this.status = 'create'
       this.setState({ visible :true ,label :'' ,title:'添加标签' })
    }

    edit = (record :any ,index :number) => {
      this.status = 'update';
      this.upID = record._id;
      this.upName = record.name;
      this.upIndex = index;
      this.setState({ visible :true ,label :record.name ,title:'修改标签' })
    }
    
    save =(record :any) => {
      this.setState({opLoading :true})
      if(this.status === 'create'){     
        Book.save(this.state.label,this.props.AdminReducer.token).then(({ success ,data ,msg }) => {
          this.setState({opLoading :false})
          if(success && data){
            let newData :any = data
            newData.key = data._id;
            this.state.data.unshift(newData)
            this.setState({ data : this.state.data ,visible :false })
            message.success(`创建成功`);
          }else{
            message.error(`创建失败,错误信息:${msg}`);
          }
        })
      }else{
        if(this.upID && this.upName){
          Book.update(this.upID,this.state.label,this.upName,this.props.AdminReducer.token).then(({success , data ,msg}) => {
            this.setState({opLoading :false})
            if(success && data){
              this.state.data[this.upIndex].name = data.name
              this.setState({ visible :false , data :this.state.data  })
              message.success(`修改成功`);
            }else{
              message.error(`修改失败,错误信息:${msg}`);
            }
          })
        }else{
          this.setState({opLoading :false ,visible :false })
        }        
      }
    }

    remove = (record :any ,index :number) => {
      this.setState({loading :true})
      Book.remove(record._id,this.props.AdminReducer.token).then(({success ,data ,msg}) => {
        this.setState({loading :false})
        if(success && data){
          this.state.data.splice(index,1)
          this.setState({ data :this.state.data })
          message.success(`删除成功`);
        }else{
          message.error(`删除失败,错误信息:${msg}`);
        }
      })
    }

    cancel = (record :any) => {
      this.setState({ visible :false  })
    }
    

    onLabelChange = (e :any) => {
      this.setState({label :e.target.value})
    }



    render() {
       return (
            <div>
                    <UAHeader data={[{value:'主页'},{value:'剧本管理'},{value:'剧本类别'}]} title="剧本类别">
                        <div style={{ textAlign: 'center' }}>
                          <Input.Search
                            placeholder="请输入"
                            enterButton="搜索"
                            onSearch = { (value :string) => this.handleSearch(value,1) }
                            size="large"
                            style={{ width: 522, marginBottom :16 }}
                          />
                        </div>
                    </UAHeader>      
                    <div className="bm-content p24_32" style={{ background:'#fff'}}>
                        <Button icon={'plus'} style={{marginBottom:8}} onClick={e => this.handleCreate(e)} type={'primary'}>创建</Button>
                        <Button icon={'reload'} style={{marginBottom:8 ,marginLeft:8}} onClick={e => this.handleRefresh(e)} type={'primary'}>刷新</Button>
                        <Alert style={{margin:'5px 0 10px'}} showIcon 
                        message={
                          <div>查到数据
                          <span style={{color:'#f5222d' ,fontWeight:'bold'}}>{this.state.pagination.total}</span>条，当前第
                          <span style={{color:'#f5222d' ,fontWeight:'bold'}}>{this.state.pagination.current}</span>页，
                          { this.state.searchName ? 
                            <span>当前查询模式为<span style={{color:'#f5222d' ,fontWeight:'bold'}}>模糊查询</span>，查询对象为：<span style={{color:'#f5222d' ,fontWeight:'bold'}}>{this.state.searchName}</span></span> : 
                            <span>当前查询模式为<span style={{color:'#f5222d' ,fontWeight:'bold'}}>全局查询</span></span>
                          }
                          </div>
                        } type="info" />
                        <Table loading={this.state.loading} pagination={this.state.pagination} bordered dataSource={this.state.data} columns={this.columns} />
                    </div>
                    <Modal
                      title={this.state.title}
                      visible={this.state.visible}
                      onOk={ this.save }
                      onCancel = {this.cancel}
                      confirmLoading = {this.state.opLoading}
                    >
                      <Form.Item label={'名称'} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                          <Input onChange={this.onLabelChange} value={this.state.label} />
                      </Form.Item>
                    </Modal>
            </div>
        )
    }
  }

import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect(state => state)(Auth('admin',BookPage))
