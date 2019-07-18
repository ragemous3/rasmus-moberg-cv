/*
Use writeFilesPlugin if you want to force the in-memory output to be written to disk with Webpack-dev-server

*/
var webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const wpHOT = require('webpack-hot-middleware');
const webpackServerMiddleware = require('webpack-server-middleware');
var history = require('connect-history-api-fallback');

var path = require('path');



module.exports = (app, express, serverConfig) => {

  var environment = process.env.NODE_ENV;
  console.log(`inside config ${__dirname}`)
    if(environment === "development"){
        console.log(`${process.env.NODE_ENV} started!`)
        app.use(express.static('public'));
        var devConf = require(`../../webpack.dev.js`);
        const compiler = webpack(devConf);
        app.use(history());
        app.use(middleware(compiler, {
          public: serverConfig.public(),
          //content base serving files from disk.
          //contentBase: path.resolve(__dirname, './../../public/'),
          host: serverConfig.host(),
          port: serverConfig.port(),
          index: path.resolve(__dirname, './../../public/index.html'),
          https: true,
          //https: !!parseInt(devServerConfig.https()),
          // hot: true, //tillåter hot-module
          // hotOnly: true,
          //historyApifallback är vad wp använder under the hood för att skicka filer till andra routes än /
          historyApiFallback: true, //ska göra så att dev-servern renderar homepage på unknown routes.
          overlay: true, //Shows a full-screen overlay in the browser when there are compiler errors or warnings.
          //stats: 'errors-only', //Instruerar webpack att bara skicka errors till konsollen
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
        }));

    }
    else if(environment === "production"){
      console.log(`${process.env.NODE_ENV} started!`)
      app.use(express.static('public/dist/'));
      process.env.SERVER_HOST = 'localhost';
      process.env.SERVER_POLL = false;
      process.env.SERVER_PORT = 443;
      return;
    }else if(environment === "live"){
      // Trigger a reroute before i let over routing to express.
      app.get('/', (req, res, next) => {
          app.disable('x-powered-by'); //bots can use this header to identify my server
          if(req.headers.host === 'www.rasmusmoberg.me'){
            //decided to not use NGINX because of the size of the page.
            return res.reroute(301, 'https://rasmusmoberg.me');
          }
          next();
        });

      process.env.SERVER_HOST = "rasmusmoberg.me";
      process.env.SERVER_POLL = false;
      process.env.SERVER_PORT = 443;
      console.log(`${process.env.NODE_ENV} started!`)
      //Automize the routing for ya!
      app.use(express.static('public/dist/'));
      return;
    }
}
