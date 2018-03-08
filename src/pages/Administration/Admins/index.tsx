import * as React from 'react';
import UAHeader from '../../../components/UAHeader'
import { Table, Button ,Popconfirm ,message ,Alert ,Modal ,Input } from 'antd';
import { Admin } from '../../../axios'

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
        title: '名称',
        dataIndex: 'name',
        width: '25%',
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text :any, record :any ,index :number) => {
          return (
            <div className="editable-row-operations">
                <Popconfirm placement="top" title={'是否删除'} onConfirm={() => { this.remove(record ,index) }} okText="确定" cancelText="取消">
                 <Button icon={'delete'} size={'small'} type={'danger'}>删除</Button>
                </Popconfirm> 
            </div>
          );
        },
      }];
      this.onPageChange = this.onPageChange.bind(this);
      this.generateCDKEY = this.generateCDKEY.bind(this)
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
        this.getAdmins(page)
    }

    componentWillMount () {
        this.getAdmins()
    }

    getAdmins = (currentPage :number = 1 ,pageSize :number = 10) => {
        this.setState({loading :true ,searchName :''})
        Admin.find(currentPage,pageSize).then(({success ,data ,pagination}) => {
            this.setState({loading :false})
            if(success && data && pagination) {
                this.setState({data : data ,pagination : { total :pagination.total , current :pagination.current}})
            }
        })
    }

    handleRefresh(e :any) {
      this.getAdmins()
    }

    remove = (record :any ,index :number) => {
      const { AdminReducer } = this.props;
      if(record._id && AdminReducer.token){
        this.setState({loading :true})
        Admin.remove(AdminReducer.token,record._id).then(({success ,data ,msg}) => {
          this.setState({loading :false})
          if(success){
            this.state.data.splice(index,1)
            this.setState({ data :this.state.data })
            message.success('删除成功');
          }else{
            message.error(`错误信息:${msg}`);
          }
        })  
      }else{
        message.error(`出现未知错误`);
      }
    }

    generateCDKEY = (value :string) => {
      const { AdminReducer } = this.props;
      const email_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      if(value && email_reg.test(value)){
        Admin.generateCDKEY(value ,AdminReducer.token).then(({success ,data ,msg}) => {
          if(success){
            Modal.success({
              title: '激活码',
              content: data,
            });
          }else{
            message.error(`错误信息:${msg}`);
          }
        })
      }else{
        message.error(`邮箱格式错误`);
      }
    }


    render() {
       return (
            <div>
                    <UAHeader data={[{value:'主页'},{value:'剧本管理'},{value:'剧本类别'}]} title="剧本类别"></UAHeader>      
                    <div className="bm-content p24_32" style={{ background:'#fff'}}>
                        <Input.Search placeholder="对方的邮箱账号" enterButton="生成激活码" size="large" style={{marginBottom:8 ,width:'50%' }} onSearch={this.generateCDKEY} />
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
            </div>
        )
    }
  }

import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect(state => state)(Auth('admin',BookPage))
