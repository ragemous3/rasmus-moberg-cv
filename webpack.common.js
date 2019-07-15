  const LEGACY_CONFIG = 'legacy';
  const MODERN_CONFIG = 'modern';



  const path = require('path');
  var fs = require('fs');

  const webpack = require('webpack');
  const merge = require('webpack-merge');

  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const WebpackNotifierPlugin = require('webpack-notifier');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  // const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  //babel

  const pkg = require('./package.json');

  const configureFontLoader = () => {
      return {
          test: /\.(ttf|eot|woff2?)$/i,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: 'fonts/[name].[ext]'
                  }
              }
          ]
      };
  };

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

  const legacyConfig = {
      module: {
          rules: [
              configureBabelLoader(Object.values(pkg.browserslist.legacyBrowsers)),
              configureFontLoader(),
          ],
        }
  };
  const modernConfig = {
      module: {
          rules: [
              configureBabelLoader(Object.values(pkg.browserslist.modernBrowsers)),
              configureFontLoader(),
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
    arr.push(styles);
    arr.push(appjs);
    return arr;
  }

  const baseConfig = {
    name: 'rasmusm-cv',
    entry: configureEntries(),
    stats: {
    // Examine all modules
    maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true
    },
    mode: 'production',
    devtool: 'source-map',
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
