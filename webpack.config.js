const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname,'src/scripts/Main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,     
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: path.resolve(__dirname, 'src/favicon/favicon.ico')
        })   
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        port: 5500,
        compress: true,
        open: true,
    },
}