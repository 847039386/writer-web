import * as React from 'react';
import UAHeader from '../../../components/UAHeader';
import { Table ,Popconfirm ,Button } from 'antd';
import { IComment } from '../../../model';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import { Comment as CommentAjax } from '../../../axios'

interface State {
    pagination : PaginationProps,           //分页
    comments :Array<IComment>,   //评论数组
    tabing : boolean
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
            tabing :false
        }
    }

    componentWillMount(){
        this._isMounted = true
        this.getComments('id');
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    onPageChange = (page :number ,pageSize :number) => {
        this.getComments('id',page)
    }
    getComments = (dramasID :string ,page :number = 1 ,count :number = 10) => {
        this.setState({tabing : true})
        CommentAjax.findByDramaID(dramasID ,page).then(({ success ,data ,pagination }) => {     
            if(this._isMounted){
                this.setState({tabing : false}); 
                if(success && data && pagination ){
                    this.setState({
                        pagination : {
                            current : pagination.current,
                            total : pagination.total,
                            pageSize :pagination.size
                        },
                        comments : data.map((d :any) : any => {
                            d.key = d._id;
                            return d;
                        })
                    })
                }
            }                 
        })
    }

    getColumns = () => {
        return [
            { key :'content' , title :'评论内容' ,dataIndex:'content' },           
            { key :'action' , title :'操作' ,render : (text: any, record: IComment, index: number) => {
                return (
                    <div>
                        <Popconfirm title={'确定删除'} onConfirm={() => {
                            this.state.comments[index]['delete'] = true;
                            const newDramas = this.state.comments
                            this.setState({comments :newDramas})
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

    render (){
        return (
            <div>
                <UAHeader data={[{value:'主页'},{value :'评论管理'}]} title="评论管理" description="评论管理" />      
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

export default CommentPage
