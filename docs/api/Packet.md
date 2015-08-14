# `type Packet`

A Plain JS object that holds all the info that will be encoded or was decoded from a [Buffer](https://nodejs.org/api/buffer.html).

It's structure is described as a [Flow annotation](http://flowtype.org/docs/type-annotations.html) in the [example](#example) underneath.

### Object Keys
  1. `sequence` A Number. Keeps track of request/response pair.
  2. `isFromServer` A Boolean. Indicating that this packet originated on the server.
  3. `isResponse` A Boolean. Indicating that this is a response to another packet.
  4. `size` A Number. Indicating the size of the packet.
  5. `totalWords` A Number. Indicating how many words it is in the `data` key.
  6. `data` An Array. That have the command + arguments.

### Example

[Flow annotation](http://flowtype.org/docs/type-annotations.html) example
```js
type Packet = {
  sequence: number;
  isFromServer: boolean;
  isResponse: boolean;
  size: number;
  totalWords: number;
  data: [string, number, boolean];
}
```

Request to a server.
```js
  let packet = {
    sequence: 0,
    isFromServer: false,
    isResponse: false,
    totalWords: 1,
    data: ['serverInfo']
  };
  packet.size = calculatePacketSize(packet);

```

Response from a server.
```js
  let packet = {
    sequence: 0,
    isFromServer: false, // NOTE: isFromServer is still false due to this packet originated on the client.
    isResponse: true,
    totalWords: 2,
    data: ['OK', 'Some server info']
  };
  packet.size = calculatePacketSize(packet);

```

Request from a server.
```js
  let packet = {
    sequence: 1,
    isFromServer: true,
    isResponse: false,
    totalWords: 2,
    data: ['player.onKill', 'Edvin_1337']
  };
  packet.size = calculatePacketSize(packet);

```
