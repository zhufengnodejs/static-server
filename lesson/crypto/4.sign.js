var crypto = require('crypto');
var fs = require('fs');
function sign() {
    var sign = crypto.createSign('RSA-SHA256');
    sign.update('test');
    return sign.sign(fs.readFileSync('key.pem').toString('ascii'), 'hex');
}
var result = sign();
console.log(result);

function verify() {
    var public = fs.readFileSync('cert.pem').toString();
    var verify = crypto.createVerify('RSA-SHA256');
    verify.update('test');
    console.log(verify.verify(public, result, 'hex'));
}
verify();