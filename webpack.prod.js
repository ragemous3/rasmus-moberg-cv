
// webpack.prod.js - production builds

// const git = require('git-rev-sync'); //kan vara gött att ha i framtiden.
const merge = require('webpack-merge');
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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//optimiserar och minimiserar css;
const PurgecssPlugin = require('purgecss-webpack-plugin'); //Tar bort oanvänd css!
const TerserPlugin = require('terser-webpack-plugin'); //minifierar js
// const WebappWebpackPlugin = require('webapp-webpack-plugin');//Genererar olika storlekar av favicons.
// const WorkboxPlugin = require('workbox-webpack-plugin'); //catchar så att webbsidan fungerar offline.
const zopfli = require('@gfx/zopfli'); //Skapar GZIPS 5% mer effektivt än vanligt

// config files
// const pkg = require('./package.json');


//Tillåter speciella symboler i classnamnen i css.

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

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
        templateContent: '',
        filename: 'index.html',
        inject: false,
    };
};

// Configure Image loader
const configureImageLoader = () => {
        return {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash].[ext]',
                        path: '[path]/img'
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

// Configure optimization
const configureOptimization = (buildType) => {
        return {
            minimizer: [
                new TerserPlugin(
                    configureTerser()
                ),
            ]
        };

};
// Configure terser
const configureTerser = () => {
    return {
        cache: true,
        parallel: true,
        sourceMap: false
    };
};


const configJS = () => {
      return {
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
                    "transform-react-jsx-img-import", //tillåter bild-inladdning i JSX

                ],
            },
          }
      };
};
// Configure Postcss loader
const configurePostcssLoader = (buildType) => {

        return {
            test: /\.(pcss|css)$/,
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
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        sourceMap: false,
                    }
                },
                // {
                //     loader: 'resolve-url-loader'
                // },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: false,
                        config: {
                          path: path.resolve(__dirname, './postcss.config.js')
                        },
                    }
                }
            ]
        };
};
// const configureHTML = () => {
//   return {
//           test: /\.html$/,
//           use: [
//               {
//                   loader: "html-loader",
//                   options: { minimize: true }
//               }
//           ]
//         },
// }
//purgecss PATH

// Configure PurgeCSS
const configurePurgeCss = () => {

  var jS = path.resolve(__dirname, 'src/js/app.js');
  var htmL = path.resolve(__dirname, 'public/index.html');
  // var comP = path.resolve(__dirname, 'src/js/components');
  var arr = [jS,htmL];

    return {
        paths: arr, //purgecss tar flera paths
        extractors: [
            {
                extractor: TailwindExtractor,
                extensions: [
                              "html",
                              "js",
                            ]
            }
        ]
    };
};


var appjs =  path.resolve(__dirname + `/src/js/app.js`);
var styles =  path.resolve(__dirname + `/src/css/styles.css`);

// Production module exports
module.exports = {

            entry:  [appjs, styles],
            node: {
              __dirname: false
            },
            output: {
                path: path.join(__dirname, './public/build'),
                publicPath: '/dist/',
                filename: '[name]-modern.[chunkhash].js',
            },
            mode: 'production',
            // devtool: 'source-map',
            // optimization: configureOptimization(LEGACY_CONFIG),
            module: {
                rules: [
                    configurePostcssLoader(),
                    configureImageLoader(),
                    configJS()
                ],
            },
            plugins: [

                new MiniCssExtractPlugin({
                    publicPath: '/css/',
                    template: '/css/styles.css',
                    chunkFilename:'[id].styles.css' ,
                    // path: path.resolve(__dirname, './public/build/css'),
                    filename: 'css/[name].[chunkhash].css', //ändring gjord här! Måste tanka js extractplug
                    //path.join('./css'),
                }),
                new PurgecssPlugin(
                    configurePurgeCss()
                ),
                new HtmlWebpackPlugin(
                    // configureHtml()
                    {
                    template: './public/index.html',
                    filename: 'index.html'
                    }
                ),
                // new WebappWebpackPlugin( //favictions i olika storlekar!
                //     configureWebapp()
                // ),
                new ImageminWebpWebpackPlugin(),
                new CompressionPlugin(
                    configureCompression()
                ),
                // new SaveRemoteFilePlugin( //avänds för att t.ex. ladda ner google.analytics-filer
                //     settings.saveRemoteFileConfig
                // ),
                new CompressionPlugin(
                    configureCompression()
                ),
              ]
}
