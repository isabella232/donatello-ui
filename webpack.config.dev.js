const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  performance: {
    hints: false
  },
  entry: {
    angular: [
      'rxjs',
      'zone.js',
      'core-js',
      '@angular/core',
      '@angular/common',
      '@angular/compiler',
      '@angular/router',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic'
    ],
    app: './src/app.module.ts'
  },
  output: {
    path: 'dist',
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: 'css-loader'
          })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: 'css-loader!less-loader'
          })
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          'file-loader?name=[name].[ext]'
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.less', '.css', '.html']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['angular', 'manifest']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      template: './src/index.tpl',
      chunks: ['manifest', 'angular', 'app']
    }),
    new ExtractTextPlugin('[name].css'),
  ]
};