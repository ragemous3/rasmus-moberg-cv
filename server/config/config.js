
var webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const wpHOT = require('webpack-hot-middleware');
var history = require('connect-history-api-fallback');

var path = require('path')
var devServerConfig = {
      public: () => process.env.DEVSERVER_PUBLIC || "http://localhost:3000",
      host: () => process.env.DEVSERVER_HOST || "localhost",
      poll: () => process.env.DEVSERVER_POLL || false,
      port: () => process.env.DEVSERVER_PORT || 3000,
      https: () => process.env.DEVSERVER_HTTPS || false,
  }

module.exports = (app) => {

  var environment = process.env.NODE_ENV;

    if(environment === "development"){
        var devConf = require(`../../webpack.dev.js`);
        //publicPath: webpackConf.output.publicPath
        const compiler = webpack(devConf);
        console.log(compiler)
        app.use(history());
        app.use(middleware(compiler, {
          // quiet: true,
          public: devServerConfig.public(),
          // publicPath: ,
          contentBase: path.resolve(__dirname, '../../public/dist'),
          host: devServerConfig.host(),
          port: devServerConfig.port(),
          https: !!parseInt(devServerConfig.https()),
          hot: true, //tillåter hot-module
          hotOnly: true,
          //historyApifallback är vad wp använder under the hood för att skicka filer till andra routes än /
          historyApiFallback: true, //ska göra så att dev-servern renderar homepage på unknown routes.
          overlay: true, //Shows a full-screen overlay in the browser when there are compiler errors or warnings.
          //stats: 'errors-only', //Instruerar webpack att bara skicka errors till konsollen
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
        }));
        // app.use(wpHOT(compiler, {
        //     log: console.log
        // }))

    }else if(environment === "production"){
      var devConf = require(`../../webpack.prod.js`);
      app.use(middleware(), {
          //Ytterliggare options att tillföra
      })
    }
}