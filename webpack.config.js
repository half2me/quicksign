const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => ({
    entry: {
        app: './js/app.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static')
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|png|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets'
                }
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': argv.mode === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.esm.js',
            'buefy-style$': argv.mode === 'production' ? 'buefy/lib/buefy.min.css': 'buefy/lib/buefy.css',
        }
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 2 // shared between two entry at least
                }
            }
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: argv.mode === 'production' ? '"production"' : '"development"'
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: argv.mode === 'production' ? 'disabled' : 'server',
            openAnalyzer: false
        }),
        new CompressionPlugin({
            test: /\.(js)/,
            algorithm: 'gzip',
            minRatio: 0.8,
            asset: '[path].gz[query]'
        }),
        new MiniCssExtractPlugin({
            chunkFilename: "style.css",
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: argv.mode === 'production' ? /\.css$/g : /\$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {removeAll: true}
            },
        })
]
})
;
