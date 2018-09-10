const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './js/app.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'static')
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['static']),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            filename: '../index.html',
            appMountId: 'app',
            title: 'QuickSign'
    }),
    ],

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': path.resolve('js'),
        }
    },
};
