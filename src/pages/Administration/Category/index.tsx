import * as React from 'react';
import UAHeader from '../../../components/UAHeader'
import { Table, Input, Popconfirm ,Button } from 'antd';
import { Category } from '../../../axios'

const EditableCell = (props :any) => (
    <div>
      {props.editable
        ? <Input style={{ margin: '-5px 0' }} value={props.value} onChange={e => props.onChange(e.target.value)} />
        :props.value
      }
    </div>
  );
  
class CategoryPage extends React.Component<any,any> {
    columns : Array<any>;
    cacheData : any;
    constructor(props :any) {
      super(props);
      this.columns = [{
        title: 'ID',
        dataIndex: 'id',
        width: '25%',
      }, {
        title: '名称',
        dataIndex: 'name',
        width: '25%',
        render: (text :any, record :any) => this.renderColumns(text, record, 'name'),
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text :any, record :any) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => this.save(record)}>保存</a>
                    <Popconfirm title="是否取消？" onConfirm={() => this.cancel(record)}>
                      &nbsp;&nbsp;<a>取消</a>
                    </Popconfirm>
                  </span>
                  : <a onClick={() => this.edit(record)}>修改</a>
              }
            </div>
          );
        },
      }];
      this.onPageChange = this.onPageChange.bind(this)
      this.state = { 
          data : [],
          pagination : { total : 0 ,onChange :this.onPageChange ,current :0},
      };
      this.cacheData = []
    }

    onPageChange = (page :number) => {
        this.getCategorys(page)
    }


    componentWillMount () {
        this.getCategorys()
    }

    getCategorys = (currentPage :number = 1 ,pageSize :number = 10) => {
        Category.find(currentPage,pageSize).then(({success ,data ,pagination}) => {
            if(success && data && pagination) {
                let newData = data.map((item :any) => {
                    item.key = item.key || item.id;
                    item.oldName = item.name;
                    return item;
                })
                this.setState({data : newData ,pagination : { total :pagination.total , current :pagination.current}})
                this.cacheData = data.map((item :any) => ({ ...item }));
            }
        })
    }

    renderColumns(text :any, record :any, column :any) {
      return (
        <EditableCell
          editable={record.editable}
          value={text}
          onChange={(value:any) => this.handleChange(value, record.key, column)}
        />
      );
    }
    handleChange(value :any, key :any, column :any) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.setState({ data: newData });
      }
    }
    edit(record :any) {
      const newData = [...this.state.data];
      const target = newData.filter(item => record.key === item.key)[0];
      if (target) {
        target.editable = true;
        this.setState({ data: newData });
      }
    }
    save(record :any) {
      if(record.name){
        const newData = [...this.state.data];
        const target = newData.filter(item => record.key === item.key)[0];
        if (target) {
          delete target.editable;
          if(target.key === 'newKey'  && target.id === 'newKey'){
            Category.save(record.name).then(({success ,data}) => {
                if(success && data){
                    target.id = target.key = data.id;
                    target.name = data.name
                    this.setState({ data: newData });
                    this.cacheData = newData.map(item => ({ ...item }));
                }
            })
          }else{
            if( record.name !== record.oldName ){
              Category.update(record.id).then(({success ,data}) => {
                  if(success && data){
                      target.id = target.key = data.id;
                      target.name = data.name
                      this.setState({ data: newData });
                      this.cacheData = newData.map(item => ({ ...item }));
                  }
              })
            }else{
              this.setState({ data: newData });
              this.cacheData = newData.map(item => ({ ...item }));
            }
          }
        }
      }
    }
    cancel(record :any) {
      const newData = [...this.state.data];
      const target = newData.filter(item => record.key === item.key)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter((item:any) => record.key === item.key)[0]);
        delete target.editable;
        this.setState({ data: newData });
      }
      if( record.key == 'newKey' ){
          newData.shift();
          this.setState({data :newData})
      }
    }

    handleCreate(e :any) {
        if(this.state.data[0].key !== 'newKey'){
            let newDate = { editable :true , key :'newKey' , id :'newKey' ,name :'' }
            let newDates = [newDate ,...this.state.data];
            newDates.pop();
            this.setState({ data : newDates })
        }
    }

    handleRefresh(e :any) {
      this.getCategorys()
    }

    handleSearch (value :string ) {
      Category.search(value).then(({success ,data ,pagination}) => {
        if(success && data && pagination) {
            let newData = data.map((item :any) => {
                item.key = item.key || item.id;
                item.oldName = item.name;
                return item;
            })
            this.setState({data : newData ,pagination : { total :pagination.total , current :pagination.current}})
        }
      }) 
    }

    render() {
       return (
            <div>
                    <UAHeader data={[{value:'主页'},{value:'剧本管理'},{value:'剧情类别'}]} title="剧情类别">
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
                    <div className="bm-content p24_32" style={{ background:'#fff'}}>
                        <Button style={{marginBottom:8}} onClick={e => this.handleCreate(e)} type={'primary'}>创建</Button>
                        <Button style={{marginBottom:8 ,marginLeft:8}} onClick={e => this.handleRefresh(e)} type={'primary'}>刷新</Button>
                        <Table pagination={this.state.pagination} bordered dataSource={this.state.data} columns={this.columns} />
                    </div>
            </div>
        )
    }
  }


export default CategoryPage
