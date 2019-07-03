  const LEGACY_CONFIG = 'legacy';
  const MODERN_CONFIG = 'modern';



  const path = require('path');
  var fs = require('fs');

  const webpack = require('webpack');
  const merge = require('webpack-merge');

  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const WebpackNotifierPlugin = require('webpack-notifier');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  // const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  //babel

  const pkg = require('./package.json');
  const configureBabelLoader = (browserlists) => {
      return {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
          use: {
              loader: 'babel-loader',
              options: {
                  cacheDirectory: true,
                  presets: [
                        [
                          '@babel/preset-env',
                          {
                              modules: false,
                              corejs:  {
                                  version: 3,
                                  proposals: true
                              },
                              //eller "usage" som säger till babel att använda polyfills per-fil-basis
                              //notera att den är väldigt instabil.
                              useBuiltIns: 'entry',
                              targets: {
                                  browsers: browserlists,
                              },
                          }
                      ],
                      ["@babel/preset-react"],
                  ],
                  plugins: [
                        '@babel/plugin-syntax-dynamic-import', //tillåter import()-syntax. Imports som promises  "plugins": ["transform-regenerator"]
                        [
                          "transform-regenerator",
                            {
                              corejs:  {
                                  version: 3,
                                  proposals: true
                              },
                            }
                        ], //tillåter asynkronisk inladdning
                        ["transform-react-jsx-img-import"], //tillåter bild-inladdning i JSX

                      ],
              },
          },
      };
  };


  // Configure Postcss loader
  const configurePostcssLoader = (buildType) => {

      if (buildType === LEGACY_CONFIG) {
          return {
              test: /\.(scss|css)$/,
              exclude: '/node_modules/',
              // oneOf: [
              //     {
              //       resourceQuery: /inline/, // foo.css?inline
              //       use: 'url-loader'
              //     },
              //     {
              //       resourceQuery: /external/, // foo.css?external
              //       use: 'file-loader'
              //     }
              //   ],
              use: [
              MiniCssExtractPlugin.loader,

                // {
                //     loader: 'css-loader',
                // },
                // {
                //     loader: 'style-loader',
                // },
                // "resolve-url-loader",
                // {
                //     loader: 'postcss-loader',
                //     options: {
                //         sourceMap: true,
                //         config: {
                //           path: path.resolve(__dirname, './postcss.config.js')
                //         },
                //     }
                // },

              ]
          };
      }
      // Don't generate CSS for the modern config in production
      if (buildType === MODERN_CONFIG) {
          return {
              test: /\.(pcss|css)$/,
              loader: 'ignore-loader'
          };
      }
  };
  const legacyConfig = {
      module: {
          rules: [
              // configurePostcssLoader(LEGACY_CONFIG),
              configureBabelLoader(Object.values(pkg.browserslist.legacyBrowsers)),
          ],
        }
  };
  const modernConfig = {
      module: {
          rules: [
              configureBabelLoader(Object.values(pkg.browserslist.modernBrowsers)),
          ],
      },
      // plugins: [
      //     new ManifestPlugin(
      //         configureManifest('manifest.json')
      //     ),
      // ]
  };

  const configureEntries = () => {
    var appjs =  path.resolve(__dirname + `/src/js/app.js`);
    var styles =  path.resolve(__dirname + `/src/css/styles.css`);
    var arr = [];
    arr.push(appjs);
    arr.push(styles);
    return arr;
  }

  const baseConfig = {
    name: 'rasmusm-cv',
    entry: configureEntries(),
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: () => process.env.PUBLIC_PATH || "/dist/",
    },
    plugins:[
      new WebpackNotifierPlugin({title: 'Webpack', excludeWarnings: false, alwaysNotify: true}),
    ]
  };

    module.exports = {
      'legacyConfig': merge.strategy({
          module: 'prepend',
          plugins: 'prepend',
      })(
          legacyConfig,
          baseConfig
      ),
      'modernConfig': merge.strategy({
          module: 'prepend',
          plugins: 'prepend',
      })(
          modernConfig,
          baseConfig,
      ),
  };
