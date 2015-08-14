### `createPacket(sequence, isFromServer, isResponse, data)`

Creates a [Packet](Packet.md) object that you can supply to the [`encodePacket(packet)`](encodePacket.md) function.  
You will use it when you have data you want to transform to a structure that [encodePacket](encodePacket.md) and [calculatePacketSize](calculatePacketSize.md) can read.

#### Arguments

1. `sequence` A Number. Keeps track of request/response pair.
2. `isFromServer` A Boolean. Indicating that this packet originated on the server.
3. `isResponse` A Boolean. Indicating that this is a response to another packet.
4. `data` An Array. That have the command + arguments to be sent.


#### Returns

[`Packet`](Packet.md): A [Packet](Packet.md) object.

#### Example

```js
import net from 'net';
import { createPacket } from 'frostbite-rcon-utils';

let packet = createPacket(0, false, false, ['serverInfo']);

console.log(packet);
// =>
// {
//   sequence: 0,
//   isFromServer: false,
//   isResponse: false,
//   size: unknown, // couldn't calculate it in my head, sorry..
//   totalWords: 1,
//   data: ['serverInfo']
// }
```
