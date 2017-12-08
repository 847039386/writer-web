
const Config = {
    theme : 'theme_white',
}

interface IConfigReducer {
    theme : string
}


const ConfigReducer = (state = Config, action :any) => {
    switch (action.type) {
        //加载中
        case 'theme_white':                
            return {...state, theme: 'theme_white'};
        //加载完毕    
        case 'theme_dark':
            console.log('theme_dark','pp')
            return {...state, theme: 'theme_dark' };
        default:
            return {...state};
    }
};


export { IConfigReducer }
export default ConfigReducer