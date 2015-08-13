# `encodePacket(packet)`

Creates a [Buffer](https://nodejs.org/api/buffer.html) that holds the encoded version of the [Packet](Packet.md) you supplied to the function.  
You will use it when you want to send a request/response to the server/client (depends on if you are creating server or a client).

#### Arguments

1. `packet` A [Packet](Packet.md) object.


#### Returns

[`Buffer`](https://nodejs.org/api/buffer.html): A instance of the NodeJS [`Buffer`](https://nodejs.org/api/buffer.html) class that holds the encoded version of the [Packet](Packet.md) object you supplied as a argument to the function.

#### Example

```js
import net from 'net';
import { encodePacket, calculatePacketSize } from 'frostbite-rcon-utils';

let packet = {
  sequence: 0,
  isFromServer: false,
  isResponse: false,
  data: ['serverInfo']
};
packet.size = calculatePacketSize(packet);
packet.totalWords = packet.data.length;

/**
 * To reduce the amount of boilerplate code used to create a packet.
 * You can use the built-in createPacket function.
 * createPacket(0, // sequence
 *              false, // isFromServer
 *              false, // isResponse
 *              ['serverInfo'] // data
 *);
 */


let encodedPacket = encodePacket(packet);

let client = net.connect(47215, '188.126.64.4', () => {
  client.write(encodedPacket);
});

```
