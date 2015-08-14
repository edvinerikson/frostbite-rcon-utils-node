### `calculatePacketSize(packet)`

Calculates the size of a [Packet](Packet.md) object.  
You will use it when you want to manually create a [Packet](Packet.md) object, e.g not use the [createPacket](createPacket.md) function.

#### Arguments

1. `packet` A partial [Packet](Packet.md) object, `size` is omitted.


#### Returns

`size`: A Number. The size of the packet.

#### Example

```js
import net from 'net';
import { calculatePacketSize } from 'frostbite-rcon-utils';

let packet = {
  sequence: 0,
  isFromServer: false,
  isResponse: false,
  data: ['serverInfo']
};

packet.totalWords = packet.data.length;
packet.size = calculatePacketSize(packet);


```
