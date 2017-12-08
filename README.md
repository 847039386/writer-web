cnpm i

tsc Version 2.4.2

create-react-app v 1.3.3

## 配置webpack
- cnpm i less-loader less

## 在node_modules/react-script-ts 里寻找 webpack.config.dev.js 与 webpack.config.prod.js 添加如下代码，支持less
```
{
  test: /\.less$/,
  loader: 'style-loader!css-loader!less-loader'
},
```
> 也可以 yarn eject 在修改。

npm start

