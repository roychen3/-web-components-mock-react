const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|png|webp)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        MALL: JSON.stringify(process.env.MALL),
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'mjs', 'tsx', 'ts'],
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    alias: {
      MockApiData: path.resolve(__dirname, '../mockApiData/'),
      Src: path.resolve(__dirname, '../src/'),
      Utils: path.resolve(__dirname, '../src/utils/'),
      Components: path.resolve(__dirname, '../src/components'),
      Images: path.resolve(__dirname, '../src/images/'),
      ModalPages: path.resolve(__dirname, '../src/modalPages/'),
      Pages: path.resolve(__dirname, '../src/pages/'),
    },
  },
};
