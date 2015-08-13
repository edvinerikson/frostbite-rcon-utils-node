/* @flow */
import net from 'net';
import { encodePacket, decodePacket, createPacket } from '../';

export default function configureServer(config: Object) { // eslint-disable-line no-unused-vars

  return net.createServer((socket: net.Socket) => {
    socket.on('data', (buf) => {
      let packet = decodePacket(buf);
      let responsePacket = createPacket(packet.sequence, false, true, ['OK']);
      if (responsePacket) {
        socket.write(encodePacket(responsePacket));
      }
    });
  });
}
