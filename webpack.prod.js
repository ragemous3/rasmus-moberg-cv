
  var LEGACY_CONFIG = 'LEGACY';
  var MODERN_CONFIG = 'MODERN';

  const shared = require('./webpack.common.js')
  const merge = require('webpack-merge');


  // webpack.prod.js - production builds

  // const git = require('git-rev-sync'); //kan vara gött att ha i framtiden.
  // const moment = require('moment'); //Konverterar datum osv
  const path = require('path');
  const webpack = require('webpack');

  const glob = require('glob-all'); //Match files using the patterns the shell uses, like stars and stuff.


  // webpack plugins
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const CompressionPlugin = require('compression-webpack-plugin'); //addar smidig komprimering av filer.
  // const CriticalCssPlugin = require('critical-css-webpack-plugin'); //plugin för criticalcss.
  const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const WebpackNotifierPlugin = require('webpack-notifier');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//optimiserar och minimiserar css;
  const PurgecssPlugin = require('purgecss-webpack-plugin'); //Tar bort oanvänd css!
  const TerserPlugin = require('terser-webpack-plugin'); //minifierar js
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  // const WebappWebpackPlugin = require('webapp-webpack-plugin');//Genererar olika storlekar av favicons.
  // const WorkboxPlugin = require('workbox-webpack-plugin'); //catchar så att webbsidan fungerar offline.
  const zopfli = require('@gfx/zopfli'); //Skapar GZIPS 5% mer effektivt än vanligt

  // config files
  const pkg = require('./package.json');


  // Konfigurerar kompresison av filer nämna med hjälp av compression-webpack-plugin
  const configureCompression = () => {
      return {
          filename: '[path].gz[query]',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
          compressionOptions: {
              numiterations: 15,
              level: 9
          },
          algorithm(input, compressionOptions, callback) {
              return zopfli.gzip(input, compressionOptions, callback);
          }
      };
  };

  const configureHtml = () => {
      return {
          // templateContent: '',
          template: './public/dist/index.html',
          filename: 'index.html',
          //inject: 'body', //If you want to link in tags into index.
      };
  };

  // Configure Image loader
  const configureImageLoader = (buildType) => {
    if (buildType === LEGACY_CONFIG) {
          return {
              test: /\.(png|jpe?g|gif|svg|webp)$/i,
              use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: '../img/[name].[ext]',
                      }
                  }
              ]
          };
       }
      if(buildType === MODERN_CONFIG){
          return {
              test: /\.(png|jpe?g|gif|svg|webp)$/i,
              use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: '../img/[name].[ext]',
                          // path: '[path]/img'
                      }
                  },
                  {
                      loader: 'img-loader',
                      options: {
                          plugins: [
                              require('imagemin-gifsicle')({
                                  interlaced: true,
                              }),
                              require('imagemin-mozjpeg')({
                                  progressive: true,
                                  arithmetic: false,
                              }),
                              require('imagemin-optipng')({
                                  optimizationLevel: 5,
                              }),
                              require('imagemin-svgo')({
                                  plugins: [
                                      {convertPathData: false},
                                  ]
                              }),
                          ]
                      }
                  }
              ]
          };
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

  // Configure optimization
  const configureOptimization = (buildType) => {
      if (buildType === LEGACY_CONFIG) {
          return {
              splitChunks: {
                  cacheGroups: {
                      default: false,
                      common: false,
                      styles: {
                          name: 'styles',
                          test: /\.css$/,
                          chunks: 'all',
                          enforce: true
                      }
                  }
              },
              minimizer: [
                  new TerserPlugin(
                      configureTerser()
                  ),
                  new OptimizeCSSAssetsPlugin({
                      cssProcessorOptions: {
                          map: {
                              inline: false,
                              annotation: true,
                          },
                          safe: true,
                          discardComments: true
                      },
                  })
              ]
          };
      }
      if (buildType === MODERN_CONFIG) {
          return {
              minimizer: [
                  new TerserPlugin(
                      configureTerser()
                  ),
              ]
          };
      };
  };
  // Configure terser
  const configureTerser = () => {
      return {
          cache: true,
          parallel: true,
          // sourceMap: true
      };
  };

  // Configure Postcss loader
  const configurePostcssLoader = (buildType) => {
      if (buildType === LEGACY_CONFIG) {
          return {
              test: /\.(pcss|css|scss)$/,
              // exclude: '/node_modules/',
              include: [
                  path.resolve(__dirname, 'node_modules'),
                  path.resolve(__dirname, 'src/css'),
                  ],
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
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                  }
                },
               {
                 loader:'css-loader',
                 options:{
                   importLoaders: 2,
                 }
               },
                {
                    loader: 'postcss-loader',
                    options: {
                        // sourceMap: true,
                    }
                },
                'resolve-url-loader'

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

  //Production module exports
  const configureCleanWebpack = () => {
    return {
        cleanOnceBeforeBuildPatterns: ['**/*'],
        verbose: true,
        dry: false
    };
};


  module.exports = [
      merge(shared.legacyConfig, {
        output: {
          path: path.resolve(__dirname, 'public/dist/legacy/'),
          publicPath: () => process.env.PUBLIC_PATH || "/legacy/",
          filename: path.join('./js', '/[name]-legacy.js'),
          chunkFilename: path.join('./js/components/','[name].js'),
        },
        optimization: configureOptimization(LEGACY_CONFIG),
        module: {
            rules: [
               configurePostcssLoader(LEGACY_CONFIG),
               configureImageLoader(LEGACY_CONFIG),
            ],
        },
        plugins: [
            new WebpackNotifierPlugin({title: 'Webpack', excludeWarnings: false, alwaysNotify: true}),

            new CleanWebpackPlugin(
                configureCleanWebpack()
            ),
            new MiniCssExtractPlugin({
                filename: path.join('../css', '[name].css'),
                chunkFilename:path.join('../css', '[name].css'),
            }),
            new HtmlWebpackPlugin(
                configureHtml()
            ),
            // new WebappWebpackPlugin(
            //     configureWebapp()
            // ),
            // new CreateSymlinkPlugin(
            //     settings.createSymlinkConfig,
            //     true
            // ),
            // new SaveRemoteFilePlugin(
            //     settings.saveRemoteFileConfig
            // ),
            new CompressionPlugin(
                configureCompression()
            ),
            // new BundleAnalyzerPlugin(
            //     configureBundleAnalyzer(LEGACY_CONFIG),
            // ),
        ],
    }), merge(shared.modernConfig, {
            output: {
                path: path.resolve(__dirname, 'public/dist/modern/'),
                publicPath: () => process.env.PUBLIC_PATH || "/modern/",
                filename: path.join('./js', '/[name]-modern.js'),
                chunkFilename: path.join('./js/components','[name].js'),
            },
            mode: 'production',
            // devtool: 'source-map',
            optimization: configureOptimization(MODERN_CONFIG),
            module: {
                rules: [
                    configurePostcssLoader(MODERN_CONFIG),
                    configureImageLoader(MODERN_CONFIG),
                ],
            },
            plugins: [
                new CleanWebpackPlugin(
                    configureCleanWebpack()
                ),
                // new webpack.BannerPlugin(
                //     configureBanner()
                // ),
                new ImageminWebpWebpackPlugin(),
                // new WorkboxPlugin.GenerateSW(
                //     configureWorkbox()
                // ),
                new CompressionPlugin(
                    configureCompression()
                ),
                // new BundleAnalyzerPlugin(
                //     configureBundleAnalyzer(MODERN_CONFIG),
                // ),
            ]
        }),

];
