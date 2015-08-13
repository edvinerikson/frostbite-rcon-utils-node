/* @flow */
import type Packet from './Packet';

export function decodeInfo(buffer: Buffer): Object {
  let h = buffer.readUInt32LE(0);

  return {
    isFromServer: !!(h & 0x80000000),
    isResponse: !!(h & 0x40000000),
    sequence: (h & 0x3fffffff),
    size: buffer.readUInt32LE(4),
    totalWords: buffer.readUInt32LE(8)
  };
}

export function decodeData(buffer: Buffer): [string, number, boolean] {
  let words = [];
  /**
   * offset is 12 by default becasue sequence, isFromServer and isResponse is in the first byte (bit: 0:4).
   * size and totalWords is in the other two bytes. (bit: 4:12)
   */
  let offset = 12;

  while (offset < buffer.length) {
    let length = buffer.readUInt32LE(offset);
    offset += 4;
    words.push(buffer.toString('ascii', offset, offset + length));
    offset += (length + 1);
  }

  words = words.map((word) => {
    if (word === 'true' || word === 'false') {
      return word === 'true';
    } else if (!isNaN(word)) {
      return Number(word);
    }
    return word;
  });
  return words;
}

export function decodePacket(buf: Buffer): Packet {
  return {
    ...decodeInfo(buf),
    data: decodeData(buf)
  };
}
