var Net = require('net');
var Utils = require('util');
var EventEmitter = require('events').EventEmitter;
var Response = require('./Response');
var Request = require('./Request');
var Packet = require('./Packet');

function Connection(params) {
    //super();
    this.packetBuffer = new Buffer(Packet.MAX_SIZE);
    this.params = params;
    EventEmitter.call(this);
}

Utils.inherits(Connection, EventEmitter);

Connection.prototype.begin = function(cb) {
    //var $this = this;

    if(!this.client === undefined) {
        this.client.end();
    }

    this.packetSize = 0;
    this.sequence = 0;
    //memory leak?
    this.packets = {};
    this.packetOffset = 0;

    this.client = Net.connect(this.params, function() {
        cb.call(this);
    }.bind(this));

    this.client.on('end', function() {
        this.emit('end');
    }.bind(this));

    this.client.on('data', function(data) {
        var offset = 0;
        while(offset < data.length) {
            if(this.packetSize == 0) {
                offset = this.waitForData(data, Packet.HEADER_SIZE, offset);

                if(offset) {
                    this.packetSize = Response.decodePacketSize(this.packetBuffer);
                } else {
                    break;
                }
            }

            if(this.packetSize && offset < data.length) {
                offset = this.waitForData(data, this.packetSize, offset);

                if(offset) {
                    var packet = Response.decodePacket(this.packetBuffer, this.packetSize);

                    if(packet.isFromServer()) {
                        this.emit('admin.event', packet.getResponse(), packet);
                    } else {
                        var seq = packet.getSequence();
                        if(packet.isOK()) {
                            if(this.packets[seq].callback !== undefined) {
                                this.packets[seq].callback(packet);
                                packet = null;
                            }
                        } else {
                            var requestPacket = this.packets[seq].packet;
                            this.emit('command.error', requestPacket.getWord(0), packet.getResponse(), requestPacket, packet)
                        }

                        delete this.packets[seq];
                    }
                    this.packetOffset = 0;
                    this.packetSize = 0;
                    this.packetBuffer.fill(0);
                } else {
                    break;
                }
            }
        }
    }.bind(this));
}

Connection.prototype.waitForData = function(data, size, offset) {
    var copySize = size - this.packetOffset;
    var dataSize = data.length - offset;

    if(copySize > dataSize) {
        data.copy(this.packetBuffer, this.packetOffset, offset);
        this.packetOffset += dataSize;
        return 0;
    } else {
        var sourceEnd = offset + copySize;
        data.copy(this.packetBuffer, this.packetOffset, offset, sourceEnd);
        this.packetOffset = size;

        return sourceEnd;
    }
}

Connection.prototype.end = function() {
    this.client.end();
}

Connection.prototype.send = function(command, params, cb) {
    var words = params ? [command].concat(params) : [command];
    var packet = new Packet({isResponse: false, isFromServer: false, sequence: this.sequence}, words);

    this.packets[this.sequence] = {
        packet: packet,
        callback: cb
    }

    this.sequence++;
    this.client.write(Request.encodePacket(packet));
}

module.exports = Connection;
