var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filename = path.join(__dirname, 'public', pathname);
    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write("请求的URL " + pathname + " 在服务器上不存在!");
            response.end();
        } else {
            fs.readFile(filename, function (err, file) {
                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end(err);
                } else {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.write(file);
                    response.end();
                }

            });
        }
    })
}).listen(8888);
