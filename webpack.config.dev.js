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
  target: 'electron-renderer',
  performance: {
    hints: false
  },
  entry: {
    polyfills: [
      './src/polyfills.ts'
    ],
    angular: [
      'rxjs',
      'ts-helpers',
      '@angular/core',
      '@angular/common',
      '@angular/compiler',
      '@angular/router',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic'
    ],
    app: './src/main.ts'
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
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
      names: ['polyfills', 'angular', 'manifest']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      template: './src/index.tpl',
      chunks: ['polyfills', 'manifest', 'angular', 'app']
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    )
  ]
};