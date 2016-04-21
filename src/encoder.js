/* @flow */
import type { Packet } from './Packet';
import { calculatePacketSize } from './utils';

export function encodeInfo(packet: Packet): Buffer {
  let header = packet.sequence & 0x3fffffff;
  if (packet.isFromServer) {
    header += 0x80000000;
  }

  if (packet.isResponse) {
    header += 0x40000000;
  }

  const buf = new Buffer(12);
  buf.writeUInt32LE(header, 0);
  buf.writeUInt32LE(calculatePacketSize(packet.words), 4); // packet size
  buf.writeUInt32LE(packet.words.length, 8); // total words
  return buf;
}

export function encodeData(words: Array<any>): Array<Buffer> {
  return words.map((dataItem) => {
    const word = dataItem.toString();
    const buf = new Buffer((word.length + 5));
    buf.writeUInt32LE(word.length, 0);
    buf.write(word, 4, word.length, 'ascii');
    buf.write('\0', 4 + word.length, buf.length - 4 + word.length, 'binary');
    return buf;
  });
}

export function encodePacket(packet: Packet): Buffer {
  return Buffer.concat([encodeInfo(packet), ...encodeData(packet.words)]);
}
