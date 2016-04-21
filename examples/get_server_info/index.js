import net from 'net';

// import { createPacket, encodePacket, decodePacket } from 'frostbite-rcon-utils';
import { createPacket, encodePacket, decodePacket } from '../../src';

const client = net.connect(/* port */ /* ip */ () => {
  client.on('data', (buf) => {
    const response = decodePacket(buf);
    console.log(response.words); // eslint-disable-line no-console
    client.end();
  });

  client.write(encodePacket(createPacket(0, false, false, ['serverInfo'])));
});
