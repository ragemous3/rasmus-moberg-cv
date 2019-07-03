const path = require('path')
var fs = require('fs');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pkt = require('./package.json')

var appjs =  path.resolve(__dirname + `/src/js/app.js`);
var styles =  path.resolve(__dirname + `/src/css/styles.css`);
// var index =  path.resolve(__dirname + `/public/index.html`);



module.exports = {
  //entrys. Vart någonstans webpack ska börja bygga
  entry:  [appjs, styles],
  output: {
    //Local disk directory to store all your output files (Absolute path
    path: path.resolve(__dirname + '/public/build'),
    //publicPath: '/', //till för cdn men kan också användas för att skapa builds
    // filename: 'my-first-webpack.bundle.[hash].js',
    // chunkFilename: '[chunkhash].js'
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  mode: "development",
  node: {
    __dirname: false,
    console: true,

  },
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
            {
              resourceQuery: /inline/, // foo.css?inline
              use: 'url-loader'
            },
            {
              resourceQuery: /external/, // foo.css?external
              use: 'file-loader'
            }
          ],
        use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            path: './dist/css',
        },

        },

        {
						loader: 'css-loader', options: { importLoaders: 1 }  /// translates CSS into CommonJS
				},
        {
            loader: 'postcss-loader', options: {
            	config: {
            		path: path.resolve(__dirname, './postcss.config.js')
            	},
	// sourceMap: true
        }
        }
      ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
        loader: "babel-loader",
        // publicPath: '/dist/js',
        //targets: pgk.browserlists --> Här kan man göra ett system för att ladda
        //in legacy- eller modernconfig när det behövs.
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
                  '@babel/plugin-syntax-dynamic-import', //tillåter import()-syntax. Imports som promises  "plugins": ["transform-regenerator"]
                  "transform-regenerator", //tillåter asynkronisk inladdning
                  "transform-react-jsx-img-import" //tillåter bild-inladdning i JSX

              ],
          },
        }

      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        exclude: '/node_modules/',
        // include: '/dist/img/',
        use: [
            {
              loader:'file-loader',
                  options: {
                      name: '[name].[ext]'
                  }
            },

          ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),

    new MiniCssExtractPlugin({
      //  "[name].css" || '[name].[hash].css'
      // '[id].css' || '[id].[hash].css'
        publicPath: '/css/',
        template: '/css/styles.css',
        filename: 'styles.css',
        chunkFilename:'[id].styles.css' ,
    })

  ],

}
