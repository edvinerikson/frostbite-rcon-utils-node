# API Reference

frostbite-rcon-utils API surface is tiny. frostbite-rcon-utils defines a set of helper functions for you to use when you are creating a RCON client or server.

This file documents the complete frostbite-rcon-utils API. Keep in mind that frostbite-rcon-utils is only concerned with encoding and decoding the data being sent or received.

### Top-Level Exports
* [createPacket(sequence, isFromServer, isResponse, data)](createPacket.md)
* [encodePacket(packet)](encodePacket.md)
* [decodePacket(buffer)](decodePacket.md)
* [calculatePacketSize(packet)](calculatePacketSize.md)

### Importing

Every function described below is a top-level export. You can import any of them like this:

#### ES6

```js
import { encodePacket } from 'frostbite-rcon-utils';
```

#### ES5 (CommonJS)

```js
var encodePacket = require('frostbite-rcon-utils').encodePacket;
```
