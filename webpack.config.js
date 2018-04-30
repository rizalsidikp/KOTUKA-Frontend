var webpack = require('webpack');
var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProdcution = process.env.NODE_ENV === 'production';

var productionPlugins = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'used-twice',
            minChunks(module, count) {
                return count >= 2;
            },
        }),
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 100000 }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: { eval: true, toplevel: true }
        }),
    ]
}

var base = {
    entry: "./src/index.js",
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                enforce: "pre",
                enforce: "post",
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {  
                    presets: ["es2015", "react", "stage-1"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        limit: 25000,
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        limit: 25000,
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: [".js", ".json", ".jsx", ".css"]
    },

    context: __dirname,

    target: "web",

    devServer: {
       historyApiFallback: true,
       contentBase: './'
    },

    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
    ],
    node: {
        console: true,
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }
}

module.exports =  (isProdcution ? { ...base, ...productionPlugins } : base)
