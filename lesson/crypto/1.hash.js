var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var md5Sum = md5.update('hello');
var result = md5Sum.digest('hex');
console.log(result);