var express = require('express');
var app = express();
var path = require('path')
var fs = require('fs');
// var url = require('url');
require('./config/config.js')(app);

var port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname + '../../public')));
  console.log(process.env.ASSET_PATH)
app.get('/', (req, res) => {
  process.env.ASSET_PATH = '/'
  sendHome(res);
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
  sendHome(res);
});
function sendHome(res){
  res.sendFile(path.resolve(__dirname, './../public/index.html'))
}
app.listen(port, () => {
  console.log('server up on 3000')
})
