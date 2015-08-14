# `type Packet`

A Plain JS object that holds all the info that will be encoded or was decoded from a [Buffer](https://nodejs.org/api/buffer.html).

It's structure is described as a [Flow annotation](http://flowtype.org/docs/type-annotations.html) in the [example](#example) underneath.

#### Object Keys
  1. `sequence` A Number. Keeps track of request/response pair.
  2. `isFromServer` A Boolean. Indicating that this packet originated on the server.
  3. `isResponse` A Boolean. Indicating that this is a response to another packet.
  4. `size` A Number. Indicating the size of the packet.
  5. `totalWords` A Number. Indicating how many words it is in the `data` key.
  6. `data` An Array. That have the command + arguments.

#### Example

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
