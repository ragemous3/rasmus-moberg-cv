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
/*
  So the smart thing would be to put a nginx server up to handle ssl
  but considering the size of this application it's not even necessary.
*/
if(process.env.NODE_ENV === 'live'){

  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/letsencrypt/live/rasmusmoberg.me/privkey.pem'))){
    httpsOptions.key = fs.readFileSync(path.resolve(__dirname,'./config/ssl/letsencrypt/live/rasmusmoberg.me/privkey.pem'));
  }
  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/letsencrypt/live/rasmusmoberg.me/cert.pem'))){
      httpsOptions.cert = fs.readFileSync(path.resolve(__dirname,'./config/ssl/letsencrypt/live/rasmusmoberg.me/cert.pem'));
    }
  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/letsencrypt/live/rasmusmoberg.me/chain.pem'))){
    httpsOptions.ca = fs.readFileSync(path.resolve(__dirname,'./config/ssl/letsencrypt/live/rasmusmoberg.me/chain.pem'));
  }

  try {
    const tls = require('tls');
    tls.createSecureContext(httpsOptions);
  } catch (err) {
    console.error('There was a TLS error!', err.message);
    console.error('Magic word please!');
    process.exit(1);
  }

}else if(process.env.NODE_ENV === 'production'){

  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/cert.pem'))){
    httpsOptions.cert = fs.readFileSync(path.resolve(__dirname,'./config/ssl/cert.pem'));
  }
  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/key.pem'))){
      httpsOptions.key = fs.readFileSync(path.resolve(__dirname,'./config/ssl/key.pem'));
    }
  if(fs.existsSync(path.resolve(__dirname,'./config/ssl/chain.pem'))){
    httpsOptions.ca = fs.readFileSync(path.resolve(__dirname,'./config/ssl/chain.pem'));
  }

  try {
    httpsOptions.passphrase = 'hej1';
    const tls = require('tls');
    tls.createSecureContext(httpsOptions);
  } catch (err) {
    console.error('There was a TLS error!', err.message);
    console.error('Magic word please!');
    process.exit(1);
  }


}
  var serverConfig = {
        public: () => process.env.SERVER_PUBLIC || "http://localhost:3000/",
        host: () => process.env.SERVER_HOST || "localhost",
        poll: () => process.env.SERVER_POLL || false,
        port: () => process.env.SERVER_PORT || 3000,
        https: () => process.env.SERVER_HTTPS || false,
    }

  require('./config/config.js')(app, express, serverConfig);

  /*
    Reverta tidigare ändringar eller bygg alla vägar manuellt.
    Nope!
  */
  app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve(__dirname, './favicon.png'));
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
        //Route www. paths to ->https://rasmusmober.me
        if(req.headers.host === 'www.rasmusmoberg.me'){
            return res.redirect(301, 'https://rasmusmoberg.me' + req.url);
        }
        if(!req.secure){
            return res.redirect(301, 'https://rasmusmoberg.me' + req.url);
        };
        res.sendFile(path.resolve(__dirname + './../public/dist/index.html'));
    }else{
      res.status(400);
      res.send('Seems you made a bad request....');
    }
  });

  function sendHome(req, res){
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
  }

  if(process.env.NODE_ENV === 'development'){
    http.createServer(app, serverConfig).listen(3000);
  }else{
    http.createServer(app, serverConfig).listen(80);
  }
    //spreading that shit into the holy book



  if(process.env.NODE_ENV === 'live' || process.env.NODE_ENV === 'production'){
    let Server_Config_Holy_Book = {...serverConfig, ...httpsOptions};
      https.createServer(Server_Config_Holy_Book, app).listen(serverConfig.port(), () => {
        console.log(`Server up on ${serverConfig.port()}`);

      });
  }
