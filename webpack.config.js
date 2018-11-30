const path = require("path");
const webpack = require("webpack");

/* plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports =(env, argv) => {
    const isDevelopment = argv.mode === 'development';

    /* Plugins */
    const devPlugins = [
        new webpack.HotModuleReplacementPlugin(),
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ];

    const commonPlugins = [
    ];

    const prodPlugins = [];

    const plugins = isDevelopment
        ? [...commonPlugins, ...devPlugins]
        : [...commonPlugins, ...prodPlugins];

    /* Webpack config */
    return ({
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "index_bundle.js",
        },
        mode: argv.mode,
        devServer: {
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
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        plugins
    })
}
    ;