### `calculatePacketSize(packet)`

Calculates the size of a [Packet](Packet.md) object.  
You will use it when you want to manually create a [Packet](Packet.md) object, e.g not use the [createPacket](createPacket.md) function.

#### Arguments

1. `words` An array of words.


#### Returns

`size`: A Number. The size of the packet.

#### Example

```js
import net from 'net';
import { calculatePacketSize } from 'frostbite-rcon-utils';

calculatePacketSize(['serverInfo', 'test', true, 0]); // => packet size
```
