import * as React from 'react';
import UAHeader from '../../../components/UAHeader'
import { Table ,Popconfirm ,Button ,message ,Alert } from 'antd';
import { Topic as TopicAjax } from '../../../axios'
import { ITopic } from '../../../model';
import { PaginationProps } from 'antd/lib/pagination/Pagination';

interface State {
    pagination : PaginationProps,           //分页
    topics :Array<ITopic>,   //评论数组
    tabing : boolean,
}

class TopicsPage extends React.Component<any,State> {
    columns :Array<any>;
    _isMounted :boolean;
    constructor(props :any){
        super(props)
        this.onPageChange = this.onPageChange.bind(this)
        this.state = {
            pagination : { total : 0 ,onChange :this.onPageChange ,current :0},
            topics :[],
            tabing :false
        }
    }

    componentWillMount(){
        this._isMounted = true
        this.getTopics(1);
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    handleRefresh = () => {
        this.getTopics(1);
    }

    onPageChange = (page :number ,pageSize :number) => {
        this.getTopics(page);
    }
    getTopics = (page :number = 1 ,count :number = 10) => {
        this.setState({tabing : true})
        TopicAjax.getDatas(page).then(({ success ,data ,pagination }) => {    
            if(this._isMounted){
                this.setState({tabing : false}); 
                if(success && data && pagination ){
                    this.setState({
                        pagination : {
                            current : pagination.current,
                            total : pagination.total,
                            pageSize :pagination.size
                        },
                        topics : data
                    })
                }
            }                 
        })
    }

    onDeleteTopic = (record :ITopic,index :number) => {
        this.state.topics[index]['delete_title'] = '删除中';
        this.setState({topics :this.state.topics})
        if(record._id){
            TopicAjax.remove(record._id,this.props.AdminReducer.token).then(({success ,data ,msg}) => {
                if(success && data){
                    this.state.topics[index]['delete'] = '已删除';
                    this.setState({topics :this.state.topics});
                    message.success('删除成功');
                }else{
                    this.state.topics[index]['delete'] = '';
                    this.setState({topics :this.state.topics});
                    message.error(`出现了错误，原因可能是${msg}`);
                }
            })
        }else{
            this.state.topics[index]['delete_title'] = '';
            this.setState({topics :this.state.topics})
            message.error('参数不符合规则');
        }  
    }

    getColumns = () => {
        return [
            { key :'title' , title :'文章标题' ,dataIndex:'title' },   
            { key :'weight' , title :'权重' ,dataIndex:'weight' },     
            { key :'create_at' , title :'创建时间' ,dataIndex:'create_at' },    
            { key :'action' , title :'操作' ,render : (text: any, record: ITopic, index: number) => {
                return (
                    <div>
                        <Popconfirm title={'确定删除'} onConfirm={() => {
                            this.onDeleteTopic(record,index)
                        }} okText="是" cancelText="否">
                            <Button disabled={this.state.topics[index]['delete']} size={'small'} type={'primary'}>
                                { this.state.topics[index]['delete'] ? this.state.topics[index]['delete'] : '删除' }
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }}
        ]
    }

    render (){
        return (
            <div>
                <UAHeader data={[{value:'主页'},{value :'文章管理'}]} title="文章管理" description="站内文章的管理" />      
                <div className="bm-content p24_32" style={{ background:'#fff' }}>
                        <Button icon={'reload'} style={{marginBottom:8 ,marginRight:8}} onClick={() => this.handleRefresh()} type={'primary'}>刷新</Button>
                        <Alert style={{margin:'5px 0 10px'}} showIcon 
                        message={
                          <div>查到数据
                          <span style={{color:'#f5222d' ,fontWeight:'bold'}}>{this.state.pagination.total}</span>条，当前第
                          <span style={{color:'#f5222d' ,fontWeight:'bold'}}>{this.state.pagination.current}</span>页，
                          </div>
                        } type="info" />
                    <Table      
                            bordered    
                            loading={this.state.tabing}              
                            columns={this.getColumns()} 
                            pagination={this.state.pagination}
                            dataSource={this.state.topics}>
                    </Table>
                </div>      
            </div>
        )
    }

}

import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect(state => state)(Auth('admin',TopicsPage))
