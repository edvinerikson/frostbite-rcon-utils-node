import expect, { createSpy } from 'expect';
import { encodePacket } from '../src/shared/encoder';
import { calculatePacketSize, createPacket, containsCompletePacket } from '../src/shared/utils';

describe('utils', () => {
  describe('caclulatePacketSize', () => {
    it('returns the size of a packet', () => {
      const packet = createPacket(0, false, false, ['OK']);
      expect(calculatePacketSize(packet)).toBe(12 + packet.data[0].length + 5);
    });
  });

  describe('containsCompletePacket', () => {
    it('returns true if the buffer contains a complete packet', () => {
      const buf = encodePacket(createPacket(0, false, false, ['OK']));
      expect(containsCompletePacket(buf)).toBe(true);
    });

    it('returns false if the buffer does not contain a complete packet', () => {
      expect(containsCompletePacket(new Buffer(4))).toBe(false);
    });

    it('will try to get the packet size from bit 4-8 if the buffer length is 8 more', () => {
      const spy = createSpy();
      const buffer = {length: 8, readUInt32LE: spy};
      containsCompletePacket(buffer);
      expect(spy.calls.length).toEqual(1);
      expect(spy.calls[0].arguments).toEqual([4]);
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
        data: ['OK'],
      });
    });
  });
});
