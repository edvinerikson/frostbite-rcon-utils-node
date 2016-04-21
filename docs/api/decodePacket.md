# `decodePacket(buffer)`

Creates a [Packet](Packet.md) that holds the decoded version of the [Buffer](https://nodejs.org/api/buffer.html) you supplied to the function.  
You will use it when you want to read the data received from a server/client (depends on if you are creating server or a client).

#### Arguments

1. `buffer` A [`Buffer`](https://nodejs.org/api/buffer.html) instance.


#### Returns

[`Packet`](Packet.md): A [Packet](Packet.md) object that holds the decoded version of the [`Buffer`](https://nodejs.org/api/buffer.html) instance you supplied as an argument to the function.

#### Example

```js
import net from 'net';
import { decodePacket, encodePacket, calculatePacketSize } from 'frostbite-rcon-utils';

let packet = {
  sequence: 0,
  isFromServer: false,
  isResponse: false,
  words: ['serverInfo']
};
packet.size = calculatePacketSize(packet.words);
packet.totalWords = packet.words.length;

/**
 * To reduce the amount of boilerplate code used to create a packet.
 * You can use the built-in createPacket function.
 * createPacket(0, // sequence
 *              false, // isFromServer
 *              false, // isResponse
 *              ['serverInfo'] // words
 *);
 */

// Small RCON server. Features: outputs the data received.
let server = net.createServer(socket => {
  socket.on('data', buf => {
    let decodedPacket = decodePacket(buf);
    console.log(decodedPacket.words); // => ['serverInfo']
  });
});

server.listen(1337);

// NOTE: This needs to run in a separate NodeJS instance
// as of the .listen method blocks the code down here.
let encodedPacket = encodePacket(packet);

// Small RCON client. Features: sends the hard-coded packet written at the top.
let client = net.connect(1337, '127.0.0.1', () => {
  client.write(encodedPacket);
});

```
