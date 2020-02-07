console.log('Performance Dashboard startet...')
const os = require('os');
const utils = require('os-utils');
var express = require('express');
var app = express();
const data = {};

console.log('OS Typ: ',os.type())
console.log('CPU Architektur: ',os.arch)
console.log('OS Plattform: ',os.platform())
console.log('OS Release: ',os.release())

data.os = os.type();
data.arch = os.arch();
data.platform = os.platform();
data.release = os.release();


/*
setInterval(() => {
utils.cpuUsage(function(v){
    console.log(new Date())
    console.log( 'CPU Usage (%): ' + (v *100).toString().substr(0, 5));
});
}, 10);
*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/', function (req, res) {
  res.json(data);
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
