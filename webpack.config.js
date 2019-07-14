const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    devtool: isDevelopment ? 'source-map' : false,
    mode: isDevelopment ? 'development' : 'production',
    externals: isDevelopment ? {} : { jquery: 'jQuery' },
    optimization: isDevelopment ? {} : {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'uipack.js',
        publicPath: '/',
        library: 'uipack'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: isDevelopment },
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: isDevelopment }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: isDevelopment },
                    }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: { minimize: !isDevelopment }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', 'scss']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'uipack.css',
        }),
    ]
}