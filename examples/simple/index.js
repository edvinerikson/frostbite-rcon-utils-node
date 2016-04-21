/* eslint-disable no-console */
import { createPacket, encodePacket, calculatePacketSize } from '../../src';

const packet = createPacket(0, false, false, ['serverInfo']);

// These should output the same value.
console.log('Size before encoded: ', calculatePacketSize(packet.words));
console.log('Size after encoded: ', encodePacket(packet).length);
