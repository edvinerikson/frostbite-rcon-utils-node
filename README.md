Frostbite-rcon-utils
====================
Simple use example, more will come!
```javascript
var Connection = require('frostbite-rcon-utils').Connection;
var Crypto = require('crypto');

var connection = new Connection({host: '127.0.0.1', port: 47000});

connection.begin(function() {
    console.log('Connected!');
    this.send('login.hashed', null, function(packet) {
        var md5 = Crypto.createHash('md5')
            .update(new Buffer(packet.getWord(0), 'hex'), 'binary')
            .update('YOUR-PASSWORD', 'ascii');

        this.send('login.hashed', [md5.digest('hex').toUpperCase()], function(packet) {
            console.log('logged in/response');
        });
    });
});
```
