import expect from 'expect';
import { createPacket } from '../src/utils';
import { encodePacket } from '../src/encoder';
import { decodePacket, decodeInfo, decodeData } from '../src/decoder';

describe('decoder', () => {
  const packet = createPacket(100, true, true, ['serverInfo', 123, true]);
  const encodedPacket = encodePacket(packet);

  describe('decodeInfo', () => {
    it('returns a partial Packet object', () => {
      expect(decodeInfo(encodedPacket)).toEqual({
        sequence: packet.sequence,
        isFromServer: packet.isFromServer,
        isResponse: packet.isResponse,
        size: packet.size,
        totalWords: packet.totalWords,
      });
    });
  });

  describe('decodeData', () => {
    it('returns a list of decoded words', () => {
      const decodedWords = decodeData(encodedPacket);
      expect(decodedWords).toBeA(Array);
      expect(decodedWords.length).toBe(packet.words.length);
    });

    it('converts numbers to native Number type', () => {
      const decodedWords = decodeData(encodedPacket);
      expect(decodedWords[1]).toBe(packet.words[1]);
    });

    it('converts booleans to native Boolean type', () => {
      const decodedWords = decodeData(encodedPacket);
      expect(decodedWords[2]).toBe(packet.words[2]);
    });
  });

  describe('decodePacket', () => {
    it('returns a Packet object', () => {
      expect(decodePacket(encodedPacket)).toEqual(packet);
    });
  });
});
