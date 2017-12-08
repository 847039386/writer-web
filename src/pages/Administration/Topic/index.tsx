import * as React from 'react';
import UAHeader from '../../../components/UAHeader';
import Markdown from '../../../components/Markdown';
import { Input } from 'antd';

interface State {
    title :string;
}

class Home extends React.Component<any,State> {

    constructor(props :any){
        super(props)
        this.state = {
            title :''
        }
    }

    onChangeTitle = (e :any) => {
        this.setState({ title : e.target.value})
    }

    onSubmit = (code :string) => {
        console.log(code,this.state.title)
    }

    render (){
        return (
            <div>
                <UAHeader data={[{value:'主页'},{value:'站内文章'},{value:'添加文章'}]} title="添加文章" description="添加站内文章" />      
                <div className="bm-content" style={{padding:24 ,background:'#fff'}} >
                    <Input placeholder={'标题'} style={{ marginBottom:20}} onChange={this.onChangeTitle} />
                    <Markdown onSubmit={this.onSubmit} />
                </div>
            </div>
        )
    }

}

export default Home
