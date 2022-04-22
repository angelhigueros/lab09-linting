const path = require('path');
const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const CSSMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.jsx',
  output: {
    clean: true,
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/,
        exclude: /styles.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtract.loader, 'css-loader'],
      },
      {
        test: /.(img|png|jpe?g|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CSSMinimizer(), new Terser()],
  },
  plugins: [
    new HtmlWebPack({
      title: 'Lab 8 - React JS',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtract({
      filename: '[name].[fullhash].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/', to: 'assets/' }],
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
