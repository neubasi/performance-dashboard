const os = require('os');
const utils = require('os-utils');
const WebSocket = require('ws');
const fs = require('fs');
const https = require('https');


const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/hy1dra.com/cert.pem', 'utf8'),
  key: fs.readFileSync('/etc/letsencrypt/live/hy1dra.com/privkey.pem', 'utf8'),
  ca: fs.readFileSync('/etc/letsencrypt/live/hy1dra.com/chain.pem', 'utf8')
});
const wss = new WebSocket.Server({ server });


//const wss = new WebSocket.Server({ host: '78.47.103.10', port: 5001 });
//const wss = new WebSocket({host:'ws://localhost', port:5000});

const data = {};

console.log('OS Typ: ', os.type())
console.log('CPU Architektur: ', os.arch)
console.log('OS Plattform: ', os.platform())
console.log('OS Release: ', os.release())

function setData() {
  data.os = os.type();
  data.arch = os.arch();
  data.platform = os.platform();
  data.release = os.release();
  utils.cpuUsage((v) => 
    data.cpu = (v * 100).toString().substr(0, 5));
}

function getData() {
  return data;
}

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  setInterval(() => {
    setData();
    ws.send(JSON.stringify(getData()))
  }, 100);

  
  
})

server.listen(5001);

