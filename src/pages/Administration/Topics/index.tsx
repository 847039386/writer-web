import * as React from 'react';
import UAHeader from '../../../components/UAHeader'
import { Table ,Popconfirm ,Button } from 'antd';
import { Topic as TopicAjax } from '../../../axios'
import { ITopic } from '../../../Models';
import { PaginationProps } from 'antd/lib/pagination/Pagination';

interface State {
    pagination : PaginationProps,           //分页
    topics :Array<ITopic>,   //评论数组
    tabing : boolean
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

    onPageChange = (page :number ,pageSize :number) => {
        this.getTopics(page)
    }
    getTopics = (page :number = 1 ,count :number = 10) => {
        this.setState({tabing : true})
        TopicAjax.getTopics(page).then(({ success ,data ,pagination }) => {     
            if(this._isMounted){
                this.setState({tabing : false}); 
                if(success && data && pagination ){
                    this.setState({
                        pagination : {
                            current : pagination.current,
                            total : pagination.total,
                            pageSize :pagination.size
                        },
                        topics : data.map((d :any) : any => {
                            d.key = d.id;
                            return d;
                        })
                    })
                }
            }                 
        })
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
                            this.state.topics[index]['delete'] = true;
                            const newTopics = this.state.topics
                            this.setState({topics :newTopics})
                        }} okText="是" cancelText="否">
                            <Button disabled={this.state.topics[index]['delete']} size={'small'} type={'primary'}>
                                { this.state.topics[index]['delete'] ? '已删除' : '删除' }
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
                    <Table          
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

export default TopicsPage
