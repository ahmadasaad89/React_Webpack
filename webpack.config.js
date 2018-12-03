const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');


/* plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports =(env, argv) => {
    const isDevelopment = argv.mode === 'development';

    /* Plugins */
    const devPlugins = [
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new WriteFilePlugin(),
    ];

    const commonPlugins = [
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ];

    const prodPlugins = [];

    const plugins = isDevelopment
        ? [...commonPlugins, ...devPlugins]
        : [...commonPlugins, ...prodPlugins];

    const stats = { children: false, maxModules: 0 }

    /* Webpack config */
    return ({
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "index_bundle.js",
            publicPath: '/',
        },
        mode: argv.mode,
        devServer: {
            historyApiFallback: true,
            stats,
            hot: true,
            port: 3001
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'eslint-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                }
            ]
        },
        plugins,
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'all'
                    }
                }
            },
        },
    })
};