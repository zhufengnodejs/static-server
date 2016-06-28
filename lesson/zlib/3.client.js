var zlib = require('zlib');
var fs = require('fs');
var http = require('http');

var request = http.get({
    host: 'localhost',
    path: '/index.html',
    port: 9090,
    headers: {
        'accept-encoding': 'gzip,deflate'
    }
})

request.on('response', function (response) {
    var output = fs.createWriteStream('test.txt');
    switch (response.headers['content-encoding']) {
        case 'gzip':
            response.pipe(zlib.createGunzip()).pipe(output);
            break;
        case 'deflate':
            response.pipe(zlib.createInflate()).pipe(output);
            break;
        default:
            response.pipe(output);
            break;
    }
});
request.end();