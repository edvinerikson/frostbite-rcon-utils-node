var HEADER_SIZE = 12;
var MAX_SIZE = 16384;

function Packet(seq, words, size) {
    this.seq = seq;
    this.words = words;
    this.size = size;
}

Packet.HEADER_SIZE = HEADER_SIZE;
Packet.MAX_SIZE = MAX_SIZE;

Packet.prototype.isFromServer = function() {
    return this.seq.isFromServer;
}

Packet.prototype.isResponse = function() {
    return this.seq.isResponse;
}

Packet.prototype.getSequence = function() {
    return parseInt(this.seq.sequence);
}
Packet.prototype.getWords = function() {
    return this.words;
}

Packet.prototype.getWord = function(idx) {
    return this.words[idx];
}

Packet.prototype.getNumWords = function() {
    return this.words.length;
}
Packet.prototype.getSize = function() {
    if(this.size === undefined) {
        var size = Packet.HEADER_SIZE;
        var length = this.words.length;

        //async doesn't work here..
        //this.words.forEach((word, idx, words) => {
        //    size += String(word).length;
        //});
        for(var i = 0; i < length; i++) {
            size += String(this.words[i]).length;
        }

        //Need to figure this out...
        this.size = size + length * 5;
    }
    return this.size;
}


module.exports = Packet;
