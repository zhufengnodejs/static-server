var crypto = require('crypto');
var fs = require('fs');
var buffer = new Buffer('hello');
var secret = crypto.publicEncrypt(fs.readFileSync('cert.pem').toString(), buffer);
var result = crypto.privateDecrypt(fs.readFileSync('key.pem').toString(), secret);
console.log(result.toString());