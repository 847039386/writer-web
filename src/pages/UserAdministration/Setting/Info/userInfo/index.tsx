import * as React from 'react';
import { Button ,Input ,Avatar, Form ,message } from 'antd';
const FormItem = Form.Item;
import { User } from '../../../../../axios'

interface State {
    avatar :string;
    nickname :string;
}

interface Props {
    uid :string,
    token :string
}

class UserInfoBindPage extends React.Component<Props,State> {
  imageLen :number = 16;
  images :Array<string> = [];
  currentAvatar :string = '';
  currentNickName :string = '';
  constructor(props :Props){
    super(props);
    for(let i = 0; i< this.imageLen; i++){
        this.images.push(`/images/avatar/${i+1}.png`)
    }
    this.state = {
        avatar :'',
        nickname :''
    } 
    this.reset = this.reset.bind(this);
    this.utAvatarAndName = this.utAvatarAndName.bind(this)
  }

  componentWillMount(){
     this.getUserInfo()
  }

  getUserInfo = () =>{
    User.getUserById(this.props.uid).then(({success ,data ,msg}) => {
        if(success && data){
            this.currentAvatar = data.avatar;
            this.currentNickName = data.name;
            this.setState({avatar :data.avatar ,nickname :data.name})
        }
    })
  }

  onNickNameChange = (e :any) => {
      this.setState({ nickname :e.target.value})
  }

  selectedAvatar = (url :string) => {
    this.setState({avatar :url})
  }

  reset = () => {
      this.setState({ avatar :this.currentAvatar ,nickname :this.currentNickName})
  }

  utAvatarAndName = () => {
    const { uid ,token } = this.props; 
    const { nickname , avatar } = this.state;
    if(nickname && avatar && this.currentAvatar != avatar || this.currentNickName != nickname ){
        User.utAvatarAndName(uid ,token ,nickname ,avatar).then(({success ,data ,msg}) => {
            if(success && data){
                this.currentNickName = data.name;
                this.currentAvatar = data.avatar;
                this.setState({ avatar :data.avatar ,nickname :data.name })
                message.success('修改成功')
            }else{
                message.error(`修改失败，原因可能是：${msg}`)
            }
        })
    }else{
        message.error('头像与昵称不能为空，并且不能与之前相同')
    }
  }
  
  render() {
    
    return (
        <div style={{ width :800 ,margin:'0 auto'}}>
            <div style={{ textAlign:'center'}}>
                <img src={this.state.avatar} style={{borderRadius:'500%' ,marginBottom:10 ,width:100 ,height:100}} />
            </div>
           <Form>
                <FormItem
                        label="昵称："
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 12 }}
                        >
                        <Input onChange={this.onNickNameChange} value={this.state.nickname} />
                </FormItem>
                <FormItem
                        label="头像"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                >
                        {
                            this.images.map((img) => {
                                return (
                                    <div key={`img_${img}`} style={{display:'inline'}} onClick={() => {this.selectedAvatar(img)}}>
                                        <Avatar style={{margin:5}} size={'large'} shape={'square'} src={img} />
                                    </div>
                                )
                            })
                        }
                </FormItem>
                <FormItem
                        labelCol = {{ span: 3  }}
                        wrapperCol={{ span: 14, offset: 4 }}
                >
                        <Button onClick={this.utAvatarAndName} type="primary" >修改</Button>&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.reset}>重置</Button>
                </FormItem>
           </Form>
           
        </div>
    )
  }
}

export default UserInfoBindPage

