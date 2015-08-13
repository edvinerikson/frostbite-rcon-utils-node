/* @flow */
import type Packet from './Packet';
import { calculatePacketSize } from './utils';

export function encodeInfo(packet: Packet): Buffer {
  let h = packet.sequence & 0x3fffffff;
  if (packet.isFromServer) {
    h += 0x80000000;
  }

  if (packet.isResponse) {
    h += 0x40000000;
  }

  let buf = new Buffer(12);
  buf.writeUInt32LE(h, 0);
  buf.writeUInt32LE(calculatePacketSize(packet), 4); // packet size
  buf.writeUInt32LE(packet.data.length, 8); // total words
  return buf;
}

export function encodeData(data: [string, number, boolean]): Array<Buffer> {
  return data.map((dataItem) => {
    let word = dataItem.toString();
    let buf = new Buffer((word.length + 5));
    buf.writeUInt32LE(word.length, 0);
    buf.write(word, 4, word.length, 'ascii');
    buf.write('\0', 4 + word.length, false, 'binary');
    return buf;
  });
}

export function encodePacket(packet: Packet): Buffer {
  return Buffer.concat([encodeInfo(packet), ...encodeData(packet.data)]);
}
