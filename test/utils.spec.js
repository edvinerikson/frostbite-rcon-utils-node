import expect from 'expect';
import { calculatePacketSize, createPacket } from '../src/shared/utils';

describe('utils', () => {
  describe('caclulatePacketSize', () => {
    it('returns the size of a packet', () => {
      const packet = createPacket(0, false, false, ['OK']);
      expect(calculatePacketSize(packet)).toBe(12 + packet.data[0].length + 5);
    });
  });

  describe('createPacket', () => {
    it('returns a Packet object', () => {
      const packet = createPacket(0, false, false, ['OK']);
      expect(packet).toEqual({
        sequence: 0,
        isFromServer: false,
        isResponse: false,
        size: calculatePacketSize(packet),
        totalWords: 1,
        data: ['OK']
      });
    });
  });
});
