import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CRouter from './router'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore ,applyMiddleware } from 'redux';
import reducer from './redux'
import thunk from 'redux-thunk';

import './public/less/index.less'       //主样式
import 'antd/dist/antd.css';            //antd
import './mock';                        //测试数据



const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><CRouter /></Provider>, document.getElementById('root') as HTMLElement);
registerServiceWorker();
