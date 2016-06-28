var buf = new Buffer('中');

console.log(buf.toString('base64'));

var buf2 = new Buffer('5Lit','base64');
console.log(buf2[0]);
console.log(buf2,buf2.toString());