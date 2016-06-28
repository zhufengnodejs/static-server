var crypto = require('crypto');
var fs = require('fs');

function cipher() {
    var cipher = crypto.createCipher('blowfish', fs.readFileSync('key.pem', 'ascii'));
    cipher.update('123456', 'utf8', 'hex');
    return cipher.final('hex');
}
var result = cipher();
console.log(result);


var decipher = crypto.createDecipher('blowfish', fs.readFileSync('key.pem', 'ascii'));
decipher.update(result, 'hex', 'utf8');
var result = decipher.final('utf8');
console.log(result);
