var express = require('express');
var app = express();
var path = require('path')
var fs = require('fs');
// var url = require('url');
require('./config/config.js')(app, express);
/*
  Reverta tidigare ändringar eller bygg alla vägar manuellt.
  Nope!
*/



var port = process.env.PORT || 3000

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, './favicon.png'));
});

app.get('/', (req, res) => {
  if(process.env.NODE_ENV === 'live'){
    sendHome(req, res);
    res.end();
  }
});
app.get('/getcv', (req,res) => {
  console.log('request was made');

  var pth = path.resolve(__dirname, './../src/files/rasmusmcv.pdf');
  res.download(pth, (err) => {
    if(err){
      res.end();
    }
  })
})

app.get('*', (req, res) => {
  process.env.ASSET_PATH = req.url;
  if(process.env.NODE_ENV === 'live'){
      res.sendFile(path.resolve(__dirname + './../public/dist/index.html'));
  }else{
    res.status(400);
    res.send('Seems you made a bad request....');
  }
});
function sendHome(req, res){
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
}
app.listen(port, () => {
  console.log('server up on 3000')
})
