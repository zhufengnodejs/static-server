var http = require("http");
var url = require("url");
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    response.write(pathname);
    response.end();
}).listen(8888);
