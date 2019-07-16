const path = require('path')
var fs = require('fs');
const webpack = require('webpack')
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
    // path: path.resolve(__dirname + '/public/'),
    // publicPath: path.resolve(__dirname + 'src'),
    // filename: 'my-first-webpack.bundle.[hash].js',
    // chunkFilename: '[chunkhash].js'
    filename: 'main.js',
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
        test: /\.html$/,
        loader: 'html-loader'
      },
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

    new MiniCssExtractPlugin({
      //  "[name].css" || '[name].[hash].css'
      // '[id].css' || '[id].[hash].css'
        publicPath: '/css/',
        template: '/css/styles.css',
        filename: 'styles.css',
        chunkFilename:'[id].styles.css' ,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      /*
      html-webpack-plugin handles adding appropriate <script> tags for you, so you might have to remove any <script> tags from the original index.html file.
      /*/
    }),

  ],

}
