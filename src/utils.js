/* @flow */
import type { Packet } from './Packet';
export const DEFAULT_HEADER_SIZE = 12;

/**
 * Calculate the size of a packet.
 * @param {Packet} packet - The packet to calculate the size of.
 */
export function calculatePacketSize(words: [string, number, boolean]): number {
  return words.reduce(
    (size, dataItem) => size + dataItem.toString().length + 5,
    DEFAULT_HEADER_SIZE
  );
}

export function containsCompletePacket(buffer: Buffer): boolean {
  return !(buffer.length < 8 || buffer.length < buffer.readUInt32LE(4));
}

/**
 * Creates a packet based on the parameters given.
 * @param {number} sequence - The sequence used to identify a request/response pair.
 * @param {boolean} isFromServer - Used to decide if the packet originated on the server.
 * @param {boolean} isResponse - Used to decide if the packet is a response or a request
 * @param {array} data - The commands/data that will be in this packet is stored here.
 */
export function createPacket(
  sequence: number,
  isFromServer: boolean,
  isResponse: boolean,
  words: Array<any>): Packet {
  return {
    sequence,
    isFromServer,
    isResponse,
    totalWords: words.length,
    words,
    size: calculatePacketSize(words),
  };
}
