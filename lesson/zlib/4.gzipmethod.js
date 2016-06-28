var zlib = require('zlib');
var fs = require('fs');

var out = fs.createWriteStream('input.log');
var input = 'input';
zlib.gzip(input, function (err, buffer) {
    if (!err) {
        zlib.unzip(buffer, function (err, buffer) {
            if (!err) {
                console.log(buffer.toString());
                out.end(buffer);
            }
        })
    }
})