import * as React from 'react';
import moment from 'moment';
import UAHeader from '../../../components/UAHeader';
import { Table ,Popconfirm ,message ,Button ,Row ,Col ,Alert  ,Form ,Select ,Icon ,Checkbox ,DatePicker ,Spin ,Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;
import { Drama as DramaAjax ,Category ,Book } from '../../../axios';
import { IDrama ,ICategory ,IBook } from '../../../model';
import './styles.less';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import { setTableColumns ,defaultExpandColumns , ExpandColumns } from './conf'





interface State {
    dramas :Array<any>,             // 剧本内容
    pagination : PaginationProps,   // 分页
    columns : Array<any>,           // 列
    expand:boolean,                  // 功能表
    expandColumns : Array<any>,        // 可显示列
    tabing : boolean,                  // table是否加载
    dramaName : string,                  // 模糊查询内容
    books : Array<IBook>,                  // 剧本类型
    categorys :Array<ICategory>             // 剧情类型
    selectedBooks :Array<string>                      // 选中的剧本类型
    selectedCategorys :Array<string>          // 选中的剧情类型
    caboLoadding :boolean                // 剧情剧本类型loadding
    createAt :Array<string>                 // 创建时间查询
}

class DramasPage extends React.Component<any,State> {
    columns : Array<any>;
    defaultExpandColumns :Array<string>;
    searchOptions :any;
    constructor(props :any){
        super(props)
        this.onPageChange = this.onPageChange.bind(this)
        this.onSelectBooks = this.onSelectBooks.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onToggle = this.onToggle.bind(this)
        this.onCheckChange = this.onCheckChange.bind(this)
        this.onReset = this.onReset.bind(this);
        this.onChangeCreateAt = this.onChangeCreateAt.bind(this)
        this.state = {
            createAt :[],
            dramaName : '',
            categorys : [],
            books : [],
            selectedBooks :[],
            selectedCategorys :[],
            tabing : false,
            expand :false,
            caboLoadding : false,
            expandColumns :defaultExpandColumns,
            columns :this.getColumn(),
            dramas : [],
            pagination : { total : 0 ,onChange :this.onPageChange ,current :0},
            
        }
    }

    // 查询按钮方法
    onSearch = (page :number = 1 ,size :number = 10) => {
        const { dramaName , selectedBooks , expandColumns , columns ,createAt ,selectedCategorys } = this.state;
        let searchOptions = { };
        if(dramaName){
            searchOptions = Object.assign(searchOptions,{ search : dramaName})
        }
        if(selectedBooks.length > 0){
            searchOptions = Object.assign(searchOptions,{ books : selectedBooks})
        }
        if(selectedCategorys.length > 0){
            searchOptions = Object.assign(searchOptions,{ categorys : selectedCategorys})
        }
        if(createAt.length == 2 && createAt[0] && createAt[1]){
            searchOptions = Object.assign(searchOptions,{ timeBegin : createAt[0] ,timeEnd: createAt[1]})
        }
        this.searchOptions = searchOptions;
        this.setState({
            columns : setTableColumns(expandColumns ,columns)
        })
        this.setState({tabing : true})
        DramaAjax.search(searchOptions,page,size).then(({success ,data ,pagination}) => {
            this.setState({tabing : false})
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

    onChangeDramaName = (e :any) => {
        this.setState({ dramaName: e.target.value });  
    }

    onCheckChange = (checkedValue :any) => {
        this.setState({ expandColumns : checkedValue })      
    }

    componentWillMount(){
        this.getBooks();
        this.getCategorys();
        this.getDramas();
    }

    // 翻页
    onPageChange = (page :number ,pageSize :number) => {
        if(this.searchOptions){
           this.onSearch(page)
        }else{
           this.getDramas(page)
        }
        
    }
    //获取剧本数据
    getDramas = (page :number = 1 ,count :number = 10) => {
        this.setState({tabing : true})
        DramaAjax.getDramas(page ,count).then(({ success ,data ,pagination }) => {
            this.setState({tabing : false})
            if(success && data && pagination){
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





    //获取table列
    getColumn = () : Array<any> => {
        let oldTab =  [
            { key :'title' , title :'剧本名' ,dataIndex:'title' },           
            { key :'action' , title :'操作' ,render : (text: any, record: IDrama, index: number) => {
                return (
                    <div>
                        <Popconfirm title={'确定删除'} onConfirm={() => {
                            this.onDeleteDrama(record ,index)
                        }} okText="是" cancelText="否">
                            <Button disabled={this.state.dramas[index]['delete']} size={'small'} type={'primary'}>
                                { this.state.dramas[index]['delete'] ? this.state.dramas[index]['delete'] : '删除' }
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }}
        ]
        return setTableColumns(defaultExpandColumns,oldTab);
    }

    onDeleteDrama = (record :IDrama,index :number) => {
        this.state.dramas[index]['delete_title'] = '删除中';
        this.setState({dramas :this.state.dramas})
        if(record._id){
            DramaAjax.remove(record._id,this.props.AdminReducer.token,'admin').then(({success ,data ,msg}) => {
                if(success && data){
                    this.state.dramas[index]['delete'] = '已删除';
                    this.setState({dramas :this.state.dramas});
                    message.success('删除成功');
                }else{
                    this.state.dramas[index]['delete'] = '';
                    this.setState({dramas :this.state.dramas});
                    message.error(`出现了错误，原因可能是${msg}`);
                }
            })
        }else{
            this.state.dramas[index]['delete_title'] = '';
            this.setState({dramas :this.state.dramas})
            message.error('参数不符合规则');
        }  
    }




    //选择剧本类型。
    onSelectBooks = (value :Array<string>) => {
        this.setState({ selectedBooks :value })
    }
    onSelectCategorys = (value :Array<string>) => {
        this.setState({ selectedCategorys :value})
    }
    onChangeCreateAt = (value :any, dateString :Array<string>) => {
        this.setState({ createAt :dateString })
    }

    ToggleDom = () : React.ReactNode => {
        return (
            <div>
                <Row style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}}>
                    <Col span={12}>
                        <FormItem labelCol={{span :4}} wrapperCol={{span:14}}  label={'剧情类型：'}>
                            <Select mode="multiple" onChange={this.onSelectCategorys}  style={{ width: '100%' }} placeholder="请选择">
                                {
                                    this.state.categorys.map((category :IBook) => {
                                        return (<Option key={category._id}>{category.name}</Option>)
                                    })
                                }                             
                            </Select>
                        </FormItem >
                    </Col>
                    <Col span={12}>
                        <FormItem labelCol={{span :4}} wrapperCol={{span:14}}  label={'创建时间：'}>
                            <RangePicker
                                format="YYYY-MM-DD HH:mm"
                                ranges={{ 
                                    '今日': [moment().startOf('day'), moment()], 
                                    '本月': [moment(), moment().endOf('month')],
                                    '今年': [moment().startOf('year'), moment() ]
                                }}
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.onChangeCreateAt}                      
                            />
                        </FormItem >
                    </Col>
                </Row>
                <Row style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}}>
                    <Col style={{textAlign:'right', color:'rgba(0, 0, 0, 0.85)' }} span={2}> 展现：</Col>
                    <Col span={22} >
                        <CheckboxGroup onChange={this.onCheckChange} 
                            options={ExpandColumns} 
                            value={this.state.expandColumns} 
                        />
                    </Col>
                </Row>
            </div>
        )
    }
    onToggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    onReset = () => {
        this.searchOptions = null;
        this.getDramas();
    }


    render (){
        return (
            <div className={"am_dp_atable"}>
                <UAHeader data={[{value:'剧本管理'}]} title="剧本管理" description="快速的浏览" />                                    
                <div className="bm-content p24_32" style={{ background:'#fff'}}>
                    <Spin spinning={this.state.caboLoadding}>        
                        <Row style={{marginBottom:16}}>
                            <Row style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}}>
                                <Col span={12}>
                                    <FormItem labelCol={{span :4}} wrapperCol={{span:14}} label={'剧名：'}>
                                        <Input 
                                            style={{width :'100%'}}
                                            onChange={this.onChangeDramaName}                                        
                                        />                                    
                                    </FormItem >
                                </Col>
                                <Col span={12}>
                                    <FormItem labelCol={{span :4}} wrapperCol={{span:14}}  label={'剧本类型：'}>
                                        <Select mode="multiple" onChange={this.onSelectBooks}  style={{ width: '100%' }} placeholder="请选择" >
                                            {
                                                this.state.books.map((book :IBook) => {
                                                    return (<Option key={book._id}>{book.name}</Option>)
                                                })
                                            }                              
                                        </Select>
                                    </FormItem >
                                </Col>
                            </Row>
                            {this.state.expand ? this.ToggleDom() : ''}
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" onClick={() => {this.onSearch(1)}}>查询</Button>
                                <Button type="primary" style={{ marginLeft: 8 }} onClick={this.onReset}>重置</Button>
                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.onToggle}>展开<Icon type={this.state.expand ? 'up' : 'down'} /></a>
                            </Col>
                        </Row>
                    </Spin>  
                    <Alert showIcon type="info" 
                        message={
                        <div>查到数据
                        <span style={{color:'#f5222d' ,fontWeight:'bold'}}>{this.state.pagination.total}</span>条，当前第
                        <span style={{color:'#f5222d' ,fontWeight:'bold'}}>{this.state.pagination.current}</span>页
                        </div>
                       }
                     
                     />
                    <Table className="am_dtable"
                        loading={this.state.tabing}
                        bordered 
                        columns={this.state.columns} 
                        pagination={this.state.pagination}
                        dataSource={this.state.dramas}>
                    </Table>
                </div>
            </div>
        )
    }

}

import { connect } from 'react-redux'
import Auth from '../../../components/Auth'
export default connect(state => state)(Auth('admin',DramasPage))
