const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path')
process.env.NODE_ENV = 'production';
module.exports = {
    entry: {
      main : "./src/index.tsx",
      vendors: ['react', 'react-router-dom', 'moment'],
    },
    output: {
        filename: "[name].bundle-[hash:8].js",
        chunkFilename: 'js/[name].chunk-[hash:8].js',
        path: path.resolve(__dirname, 'build','app'),
        publicPath :'/app/'
    },

    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    // ["import",{"libraryName":"antd","style":true}],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                      before: [ tsImportPluginFactory({
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
                        style: true
                      }) ]
                    }),
                    compilerOptions: {
                      module: 'es2015'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'media/[name].[hash:8].[ext]',
                },
            },
            {
                test:  /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: "file-loader?name=public/[name]-[hash:3].[ext]"
            },
            { test: /\.less$/ ,loader: "style-loader!css-loader!less-loader" },
            { 
                test: /\.css$/ ,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
             }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.

    plugins: [
     new HtmlWebpackPlugin({template:'./public/index.html',filename:'index.ejs'}),
     new LodashModuleReplacementPlugin,
     new ExtractTextPlugin({filename:'css/css.[hash:3].css'}),
     new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings:false,
            drop_console: true,
            pure_funcs: ['console.log']
        }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}}),
    new webpack.optimize.CommonsChunkPlugin({
        name:['vendors'],
        filename:"common-[hash:8].js",
       
    }),
    new ExtractTextPlugin("styles.css"),
    new CompressionPlugin({ 
        asset: "gzip/[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 0,
        minRatio: 0
    })

   ],

};
