const express = require('express');
const request = require('request');
const https = require('https');
const { SocksProxyAgent } = require('socks-proxy-agent');
const tr = require('tor-request');
const proxy = require('http-proxy-middleware');

const agent = new SocksProxyAgent('socks://127.0.0.1:9050');

const app = express();

app.use(
  '/',
  proxy({
    target: 'https://venus.web.telegram.org', 
    changeOrigin: true,
    agent,
    router: (req) => {
      const host = req.headers['xxxx-origin'];
      delete req.headers['xxxx-origin'];
      
      return host;
    },
    onError: (err, req, res) => {
      console.error(err);
    },
  }),
);

// app.get('/', function(req, res) {
//     res.send('index');
// });

// app.get('/proxyimage', (req, resp) => {
//     const { url } = req.query;
    
//     tr.request(url, function (err, res, body) {
//       resp.send(body);
//     });
// });

const PORT = parseInt(process.env.PORT || 3000);
app.listen(PORT, function() {
    console.log('Node app is running on port:', PORT);

    // 注册全局未捕获异常处理器
    process.on('uncaughtException', function(err) {
        console.error('Caught exception:', err.stack);
    });
    process.on('unhandledRejection', function(reason, p) {
        console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
    });
});
