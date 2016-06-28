var crypto = require('crypto');
var shasum = crypto.createHmac('sha1', 'zfpx');
var result = shasum.update('hello').digest('hex');
console.log(result);

