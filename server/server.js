var express = require('express');
var app = express();
var path = require('path')
var fs = require('fs');
const https = require('https');

console.log(process.argv[2])
const httpsOptions = {
  cert: fs.readFileSync(path.resolve(__dirname,'./config/ssl/cert.crt')),
  key: fs.readFileSync(path.resolve(__dirname,'./config/ssl/key.key')),
  passphrase: process.argv[2]
}

try {
  const tls = require('tls');
  tls.createSecureContext(httpsOptions);
} catch (err) {
  console.error('There was a TLS error!', err.message);
  console.error('Did you enter the right passphrase?');
  process.exit(1);
}

var serverConfig = {
      public: () => process.env.DEVSERVER_PUBLIC || "https://localhost:3000/",
      host: () => process.env.DEVSERVER_HOST || "localhost",
      poll: () => process.env.DEVSERVER_POLL || false,
      port: () => process.env.DEVSERVER_PORT || 3000,
      https: () => process.env.DEVSERVER_HTTPS || true,
      cert: httpsOptions.cert,
      key: httpsOptions.key,
      passphrase: httpsOptions.passphrase
  }

require('./config/config.js')(app, express, serverConfig);

/*
  Reverta tidigare ändringar eller bygg alla vägar manuellt.
  Nope!
*/
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, './favicon.png'));
});

app.get('/', (req, res) => {
  if(process.env.NODE_ENV === 'live' || process.env.NODE_ENV === 'production'){
    app.disable('x-powered-by'); //bots can use this header to identify my server
    sendHome(req, res);
    res.end();
  }
});
app.get('/getcv', (req,res) => {

  var pth = path.resolve(__dirname, './../src/files/rasmusmcv.pdf');
  res.download(pth, (err) => {
    if(err){
      res.end();
    }
  })
})

app.get('*', (req, res) => {
  process.env.ASSET_PATH = req.url;
  if(process.env.NODE_ENV === 'live' || process.env.NODE_ENV === 'production'){
      res.sendFile(path.resolve(__dirname + './../public/dist/index.html'));
  }else{
    res.status(400);
    res.send('Seems you made a bad request....');
  }
});

function sendHome(req, res){
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
}
console.log(serverConfig.host())
https.createServer({
  host: serverConfig.host(),
  port: serverConfig.port(),
  path: '/',
  cert: serverConfig.cert,
  key: serverConfig.key,
  passphrase: serverConfig.passphrase,
  // rejectUnauthorized: false,
  // requestCert: true,
  // agent: false
}, app).listen(serverConfig.port(), () => {
  console.log(`Server up on ${serverConfig.port()}`);

});
