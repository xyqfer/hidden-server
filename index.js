const express = require('express');
const request = require('request');

const app = express();

app.get('/', function(req, res) {
    res.send('index');
});

router.get('/proxyimage', (req, res) => {
    const { url } = req.query;
    const headers = {};

    if (req.headers.range) {
        headers.Range = req.headers.range;
    }

    request
        .get({
            url,
            headers,
            proxy: 'socks5h://127.0.0.1:9050'
        })
        .pipe(res);
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
