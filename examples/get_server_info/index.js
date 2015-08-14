import net from 'net';

// import { createPacket, encodePacket, decodePacket } from 'frostbite-rcon-utils';
import { createPacket, encodePacket, decodePacket } from '../../src';

let client = net.connect(47215, '188.126.64.4', () => {
  client.on('data', (buf) => {
    let response = decodePacket(buf);
    console.log(response.data); // eslint-disable-line no-console
    // => [ 'OK', 'Martins HC testserver1', 0, 6, 'ConquestLarge0', 'MP_Flooded', 0, 1, 2, 4000, 4000, 0, 0, false, false, true, 674067, 323420, '188.126.64.4:25015', 0, true, 'EU', 'ams', 'SE', 0, 'IN_GAME' ]
  });

  client.write(encodePacket(createPacket(0, false, false, ['serverInfo'])));
});
