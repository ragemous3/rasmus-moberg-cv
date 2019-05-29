"use strict";
const path = require('path')
var fs = require('fs');

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pkt = require('./package.json')

var appjs =  path.resolve(__dirname + `/src/js/app.js`);
var styles =  path.resolve(__dirname + `/src/css/styles.css`);
// var index =  path.resolve(__dirname + `/public/index.html`);

console.log(appjs)
module.exports = {

  entry:  [appjs, styles], //Behöver bara en entry för jag använder dynamic code splitting.
  output: {
    //Local disk directory to store all your output files (Absolute path
    path: path.resolve(__dirname + '/public/dist'),
    publicPath:  '/', //Where you uploaded your bundled files
    //index.html hittar filerna då på http://server/<-----------
    // path.resolve(__dirname + '/public'),
    //hashar för cachebusting
    // filename: 'my-first-webpack.bundle.[hash].js',
    // chunkFilename: '[chunkhash].js'
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  mode: "development",
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './dist/css',
            // hmr: process.env.NODE_ENV === 'development',
          //   use:  [
          //   { loader: 'css-loader', options: { importLoaders: 1 } },
          //   'postcss-loader',
          // ],
          },

        },
        {
						loader: 'css-loader', options: { importLoaders: 1 }  /// translates CSS into CommonJS
				},
        {
            loader: 'postcss-loader'
        }
      ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
        loader: "babel-loader",
        //targets: pgk.browserlists --> Här kan man göra ett system för att ladda
        //in legacy- eller modernconfig när det behövs.
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
                  '@babel/plugin-syntax-dynamic-import', //tillåter import()-syntax. Imports som promises  "plugins": ["transform-regenerator"]
                  "transform-regenerator"


              ],
          },
        }

      },
      {
        test: /\.html$/,
        use: [
            {
                loader: "html-loader",
                options: { minimize: true }
            }
        ]
      },
    ],
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(), Kolla react-hot-loader

    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    // new MiniCssExtractPlugin({
    //   //  "[name].css" || '[name].[hash].css'
    //   // '[id].css' || '[id].[hash].css'
    //     template: 'src/css/style.css',
    //     filename: 'styles.css',
    //     chunkFilename:'[id].styles.css' ,
    // })
    //Läs PÅ?

  ],

}
