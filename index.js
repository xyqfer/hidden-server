const express = require('express');
const request = require('request');
const https = require('https');
const { SocksProxyAgent } = require('socks-proxy-agent');

const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');

const app = express();

app.get('/', function(req, res) {
    res.send('index');
});

app.get('/proxyimage', (req, resp) => {
    const { url } = req.query;
    https.get(url, {
      agent
    }, res => {
      res.pipe(resp);
    });
});

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
