var zlib = require('zlib');
var fs = require('fs');

function zip(src) {
    var gzip = zlib.createGzip();
    var inputStream = fs.createReadStream(src);
    var outputStream = fs.createWriteStream(src+'.gz');
    inputStream.pipe(gzip).pipe(outputStream);
}
zip('source.txt');

function gunzip(src){
    var gunzip = zlib.createGunzip();
    var inputStream = fs.createReadStream(src);
    var outputStream = fs.createWriteStream(src.slice(0,-3));
    inputStream.pipe(gunzip).pipe(outputStream);
}


gunzip('source.txt.gz');

