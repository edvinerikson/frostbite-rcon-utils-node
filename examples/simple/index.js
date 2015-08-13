import { createPacket, encodePacket, calculatePacketSize } from '../../src';

let packet = createPacket(0, false, false, ['serverInfo']);

// These should output the same value.
console.log('Size before encoded: ', calculatePacketSize(packet)); // eslint-disable-line no-console
console.log('Size after encoded: ', encodePacket(packet).length); // eslint-disable-line no-console
