import * as React from 'react';
import moment from 'moment';
import UAHeader from '../../../components/UAHeader';
import { Table ,Popconfirm ,Button ,Row ,Col ,Alert  ,Form ,Select ,Icon ,Checkbox ,AutoComplete ,DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;
const AOption = AutoComplete.Option;
import { Drama as DramaAjax } from '../../../axios';
import { IDrama } from '../../../Models';
import './styles.less';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import { setTableColumns ,defaultExpandColumns , ExpandColumns } from './conf'





interface State {
    titleSource :Array<any>,
    dramas :Array<any>,             //剧本内容
    pagination : PaginationProps,   //分页
    columns : Array<any>,           //列
    expand:boolean,                  //功能表
    expandColumns : Array<any>,        //可显示列
    tabing : boolean,                  //table是否加载
    dramaName : string,                  //模糊查询内容
    dramaType : string,                  //剧本类型
    dramaDtType :Array<string>             //剧情类型
    createAt :Array<string>                 //创建时间查询
}

class Dramas extends React.Component<any,State> {
    columns : Array<any>;
    defaultExpandColumns :Array<string>
    constructor(props :any){
        super(props)
        this.onPageChange = this.onPageChange.bind(this)
        this.onSelectNeed = this.onSelectNeed.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onToggle = this.onToggle.bind(this)
        this.onCheckChange = this.onCheckChange.bind(this)
        this.onReset = this.onReset.bind(this);
        this.onChangeCreateAt = this.onChangeCreateAt.bind(this)
        this.state = {
            createAt :[ ],
            titleSource : [],
            dramaName : '',
            dramaType :'',
            dramaDtType : [],
            tabing : false,
            expand :false,
            expandColumns :defaultExpandColumns,
            columns :this.getColumn(),
            dramas : [],
            pagination : { total : 0 ,onChange :this.onPageChange ,current :0},
            
        }
    }

    // 查询按钮方法
    onSearch = () => {
        const { dramaName , dramaType , expandColumns , columns ,createAt ,dramaDtType } = this.state
        if(dramaName){
            console.log('有模糊查询：',dramaName)
        }
        if(dramaType && dramaType != 'all'){
            console.log('选择了剧本类型：',dramaType)
        }
        if(dramaDtType.length > 0){
            console.log('选择了剧情类型：',dramaDtType)
        }
        if(createAt.length > 0 && createAt[0] && createAt[1]){
            console.log('有时间查询' ,createAt)
        }
        this.setState({
            columns : setTableColumns(expandColumns ,columns)
        })
    }

    onChangeDramaName = (value :string) => {
        this.setState({ dramaName: value });
        if(value && value!= ''){
            DramaAjax.getDimTitles(value).then(({ data,success }) => {
                if(data && success){
                     this.setState({ titleSource : data})
                }
            })
        }else{
            this.setState({ titleSource : []})
        }    
    }

    onCheckChange = (checkedValue :any) => {
        this.setState({ expandColumns : checkedValue })      
    }

    componentWillMount(){
        this.getDramas();
    }

    // 翻页
    onPageChange = (page :number ,pageSize :number) => {
        this.getDramas(page)
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
                    dramas :data.map((d :any) : any => {
                        d.key = d.id;
                        return d;
                    })
                })
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
                            this.state.dramas[index]['delete'] = true;
                            const newDramas = this.state.dramas
                            this.setState({dramas :newDramas})
                        }} okText="是" cancelText="否">
                            <Button disabled={this.state.dramas[index]['delete']} size={'small'} type={'primary'}>
                                { this.state.dramas[index]['delete'] ? '已删除' : '删除' }
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }}
        ]
        return setTableColumns(defaultExpandColumns,oldTab);
    }

    //选择剧本类型。
    onSelectNeed = (value :any) => {
        this.setState({ dramaType :value })
    }
    onSelectDTNeed = (value :any) => {
        this.setState({ dramaDtType :value})
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
                            <Select mode="multiple" onChange={this.onSelectDTNeed}  style={{ width: '100%' }} placeholder="请选择">
                                <Option key={'mvk'}>{'搞笑'}</Option>
                                <Option key={'mvj'}>{'神情'}</Option>
                                <Option key={'mvl'}>{'动漫'}</Option>                                    
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
    
    renderOption = (item :any) : any  => {
        return (
            <AOption key={`${item.title}`} >
                {item.title}
            </AOption>
        )
    }

    onReset = () => {
        this.getDramas();
    }


    render (){
        return (
            <div className={"am_dp_atable"}>
                <UAHeader data={[{value:'剧本管理'}]} title="剧本管理" description="快速的浏览" />                                    
                <div className="bm-content p24_32" style={{ background:'#fff'}}>
                    <Row style={{marginBottom:16}}>
                        <Row style={{borderBottom: '1px dashed #e8e8e8' ,paddingBottom:11 ,marginBottom:16}}>
                            <Col span={12}>
                                <FormItem labelCol={{span :4}} wrapperCol={{span:14}} label={'剧名：'}>
                                    <AutoComplete 
                                        placeholder={'请输入要查询的剧本...'}
                                        style={{width :'100%'}}
                                        dataSource={this.state.titleSource.map(this.renderOption)} 
                                        onChange={this.onChangeDramaName}>                                        
                                    </AutoComplete>                                    
                                </FormItem >
                            </Col>
                            <Col span={12}>
                                <FormItem labelCol={{span :4}} wrapperCol={{span:14}}  label={'剧本类型：'}>
                                    <Select onChange={this.onSelectNeed}  style={{ width: '100%' }} placeholder="请选择" defaultValue={'all'} >
                                        <Option key={'all'}>{'全部'}</Option>
                                        <Option key={'mv'}>{'电影'}</Option>
                                        <Option key={'tv'}>{'电视剧'}</Option>                                    
                                    </Select>
                                </FormItem >
                            </Col>
                        </Row>
                        {this.state.expand ? this.ToggleDom() : ''}
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={this.onSearch}>查询</Button>
                            <Button type="primary" style={{ marginLeft: 8 }} onClick={this.onReset}>重置</Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.onToggle}>展开<Icon type={this.state.expand ? 'up' : 'down'} /></a>
                        </Col>
                    </Row>  
                    <Alert showIcon message={`查到数据${this.state.pagination.total}条，当前第${this.state.pagination.current}页`} type="info" />
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

export default Dramas
