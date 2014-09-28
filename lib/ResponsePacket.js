var Utils = require('util');
var Packet = require('./Packet.js');


function ResponsePacket(sequence, words, size) {
    Packet.call(this, sequence, words, size);
}

Utils.inherits(ResponsePacket, Packet);

ResponsePacket.prototype.isOK = function() {
    return this.words[0] == "OK";
}

ResponsePacket.prototype.getResponse = function() {
    return this.words[0];
}

ResponsePacket.prototype.getWords = function() {
    return Packet.prototype.getWords.call(this).slice(1);
}

ResponsePacket.prototype.getWord = function(idx) {
    return Packet.prototype.getWord.call(this, idx + 1);
}

ResponsePacket.prototype.getNumWords = function() {
    return Packet.prototype.getNumWords.call(this) - 1;
}

module.exports = ResponsePacket;
