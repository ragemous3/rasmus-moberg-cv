var express = require('express');
var app = express();
const path = require('path')
const fs = require('fs');
const https = require('https');
const http = require('http');
const bcrypt = require('bcryptjs');


if(process.env.NODE_ENV !== 'development'){

    var data = fs.readFileSync(path.resolve(__dirname, './config/crypt/crypt.txt'))
    var hash = data.toString('utf-8');
    var givenPass = '';
    if(process.argv[2]){
      givenPass = process.argv[2];
    }else{
      console.log("\x1b[31m", '---- You have to provide a password! ----')
      process.exit(1);
    }

    var response = bcrypt.compareSync(givenPass, hash);


    if(!response){
      console.log("\x1b[31m", `---- Wrong password ----`);
      process.exit(1);
    }else{
      console.log("\x1b[32m", '---- Nothing wrong here! Carry on ----');
    };
}


var httpsOptions = {};
  httpsOptions.passphrase = "hej1";
  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/cert.pem'))){
    httpsOptions.cert = fs.readFileSync(path.resolve(__dirname,'./config/ssl/cert.pem'));
  }
  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/key.pem'))){
    httpsOptions.key = fs.readFileSync(path.resolve(__dirname,'./config/ssl/key.pem'));
  }
  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/ca.pem'))){
    httpsOptions.ca = fs.readFileSync(path.resolve(__dirname,'./config/ssl/ca.pem'));
  }


  try {
    const tls = require('tls');
    tls.createSecureContext(httpsOptions);
  } catch (err) {
    console.error('There was a TLS error!', err.message);
    console.error('Magic word please!');
    process.exit(1);
  }

  var serverConfig = {
        public: () => process.env.SERVER_PUBLIC || "http://localhost:3000/",
        host: () => process.env.SERVER_HOST || "localhost",
        poll: () => process.env.SERVER_POLL || false,
        port: () => process.env.SERVER_PORT || 3000,
        https: () => process.env.SERVER_HTTPS || false,
        cert: httpsOptions.cert,
        key: httpsOptions.key,
        agent: false, //no connection pooling
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

  http.createServer(app, function(req,res) {
    res.redirect('https://' + req.headers.host + req.url);
  }).listen(80);
//spreading that shit into the holy book

  let Server_Config_Holy_Book = {...serverConfig, ...httpsOptions};

  https.createServer(Server_Config_Holy_Book, app).listen(serverConfig.port(), () => {
    console.log(`Server up on ${serverConfig.port()}`);

  });
