import expect from 'expect';
import { createPacket } from '../src/shared/utils';
import { encodePacket, encodeInfo, encodeData } from '../src/shared/encoder';

describe('encoder', () => {
  const packet = createPacket(100, true, true, ['serverInfo']);

  describe('encodeInfo', () => {
    let info = encodeInfo(packet);
    let h = info.readUInt32LE(0);

    it('returns a Buffer', () => {
      expect(encodeInfo(packet)).toBeA(Buffer);
    });

    it('encodes the sequence at 0x3fffffff', () => {
      expect((h & 0x3fffffff)).toBe(packet.sequence);
    });

    it('encodes the isFromServer flag at 0x80000000', () => {
      expect((!!(h & 0x80000000))).toBe(packet.isFromServer);
    });

    it('encodes the isResponse flag at 0x40000000', () => {
      expect((!!(h & 0x40000000))).toBe(packet.isResponse);
    });

    it('encodes the packet size at the second byte', () => {
      expect(info.readUInt32LE(4)).toBe(packet.size);
    });

    it('encodes the total number of words (totalWords) used in the data key at the third byte', () => {
      expect(info.readUInt32LE(8)).toBe(packet.totalWords);
    });
  });

  describe('encodeData', () => {
    it('returns a list of Buffers', () => {
      expect(encodeData(packet.data)).toBeA(Array);
      encodeData(packet.data).forEach((buffer) => {
        expect(buffer).toBeA(Buffer);
      });
    });

    it('encodes the length of the word at the first byte', () => {
      expect(encodeData(packet.data)[0].readUInt32LE(0)).toBe(packet.data[0].length);
    });

    it('encodes the word at the second byte to the length of the word', () => {
      let word = packet.data[0];
      expect(encodeData(packet.data)[0].toString('ascii', 4, 4 + word.length)).toBe(word);
    });
  });

  describe('encodePacket', () => {
    it('returns a Buffer', () => {
      expect(encodePacket(packet)).toBeA(Buffer);
    });
  });
});
