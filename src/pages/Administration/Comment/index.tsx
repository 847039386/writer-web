import * as React from 'react';
import UAHeader from '../../../components/UAHeader';
import { Table ,Popconfirm ,Button ,Input ,message } from 'antd';
import { ICommentPopulate } from '../../../model';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import { Comment as CommentAjax } from '../../../axios'

interface State {
    pagination : PaginationProps,           //分页
    comments :Array<ICommentPopulate>,   //评论数组
    tabing : boolean,
    dramaID :string
}

class CommentPage extends React.Component<any,State> {
    columns :Array<any>;
    _isMounted :boolean;
    constructor(props :any){
        super(props)
        this.onPageChange = this.onPageChange.bind(this)
        this.state = {
            pagination : { total : 0 ,onChange :this.onPageChange ,current :0},
            comments :[],
            tabing :false,
            dramaID : ''
        }
        this.removeCommentByID = this.removeCommentByID.bind(this)
    }

    componentWillMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    onPageChange = (page :number ,pageSize :number) => {
        this.getComments(this.state.dramaID,page)
    }
    getComments = (dramaID :string ,page :number = 1 ,count :number = 10) => {
        this.setState({tabing : true ,dramaID},() => {
            CommentAjax.findByDramaID(dramaID ,page).then(({ success ,data ,pagination ,msg }) => {     
                if(this._isMounted){
                    this.setState({tabing : false}); 
                    if(success && data && pagination ){
                        this.setState({
                            pagination : {
                                current : pagination.current,
                                total : pagination.total,
                                pageSize :pagination.size
                            },
                            comments : data 
                        })
                    }else{
                        message.error(`错误的搜索，原因可能是：${msg}`)
                    }
                }                 
            })
        })    
    }

    removeCommentByID = (record :ICommentPopulate ,index :number) => {
        CommentAjax.findRemoveByID(record._id,'token').then(({ success ,data ,msg }) => {
            if(success){
                message.success(`删除成功`)
                this.state.comments[index]['delete'] = true;
                const newDramas = this.state.comments
                this.setState({comments :newDramas})
            }else{
                message.error(`删除错误，原因可能是：${msg}`)
            }
        })
    }

    getColumns = () => {
        return [
            { key :'content' , title :'评论内容' ,dataIndex:'content' },           
            { key :'action' , title :'操作' ,render : (text: any, record: ICommentPopulate, index: number) => {
                return (
                    <div>
                        <Popconfirm title={'确定删除'} onConfirm={() => {
                            this.removeCommentByID(record ,index)
                        }} okText="是" cancelText="否">
                            <Button disabled={this.state.comments[index]['delete']} size={'small'} type={'primary'}>
                                { this.state.comments[index]['delete'] ? '已删除' : '删除' }
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }}
        ]
    }

    handleSearch = (value :any) =>{
        this.getComments(value)
    }

    render (){
        return (
            <div>
                <UAHeader data={[{value:'主页'},{value :'评论管理'}]} title="评论管理" description="请输入剧本ID">
                        <div style={{ textAlign: 'center' }}>
                          <Input.Search
                            placeholder="请输入"
                            enterButton="搜索"
                            onSearch = { (value :string) => this.handleSearch(value) }
                            size="large"
                            style={{ width: 522, marginBottom :16 }}
                          />
                        </div>
                </UAHeader>      
                <div className="bm-content p24_32" style={{ background:'#fff' }}>
                    <Table     
                            bordered     
                            loading={this.state.tabing}              
                            columns={this.getColumns()} 
                            pagination={this.state.pagination}
                            dataSource={this.state.comments}>
                    </Table>
                </div>      
            </div>
        )
    }

}

import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect(state => state)(Auth('admin',CommentPage))
