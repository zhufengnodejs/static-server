var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require('mime');
var zlib = require("zlib");
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = pathname + (pathname.endsWith('/') ? 'index.html' : '');
    var filename = path.join(__dirname, 'public', pathname);
    fs.exists(filename, function (exists) {
        if (exists) {
            byEtag();
        } else {
            sendNotFound();
        }
    })

    function byEtag() {
        var ifNoneMatch = request.headers['if-none-match'];
        if (ifNoneMatch) {
            fs.readFile(filename, function (err, file) {
                if (err) {
                    sendServerError();
                } else {
                    var etag = require('crypto').createHash('md5').update(file).digest('hex');
                    if (etag == ifNoneMatch) {
                        byTime();
                    } else {
                        sendFile(undefined, etag, file);
                    }
                }
            });
        } else {
            byTime();
        }
    }

    function byTime() {
        var ifModifiedSince = request.headers['if-modified-since'];
        fs.stat(filename, function (err, stat) {
            if (ifModifiedSince == stat.mtime.toUTCString()) {
                sendNotModified();
            } else {
                sendFile(stat.mtime.toUTCString());
            }
        })
    }

    function sendNotFound() {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Not Found');
    }

    function sendServerError() {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end(err);
    }

    function sendNotModified() {
        response.writeHead(304, {'Content-Type': 'text/plain'});
        response.end('Not Modified');
    }

    function sendFile(LastModified, etag, file) {
        if (LastModified && etag) {
            send(LastModified, etag, file);
        } else if (etag) {
            fs.stat(filename, function (err, stat) {
                send(stat.mtime.toUTCString(), etag, file);
            })
        } else if (LastModified) {
            fs.readFile(filename, function (err, file) {
                send(LastModified, require('crypto').createHash('md5').update(file).digest('hex'), file);
            });
        }
    }

    function send(etag, LastModified, file) {
        var expires = new Date(Date.now() + 3600 * 1000);
        response.writeHead(200, {
            'Cache-Control': 'Max-Age=3600',
            'Expires': expires.toUTCString(),
            'Content-Type': mime.lookup(filename),
            'Last-Modified': LastModified,
            'Etag': etag,
            'Content-Encoding': 'gzip'
        });
        fs.createReadStream(filename).pipe(zlib.createGzip()).pipe(response);
    }
}).listen(8888);

