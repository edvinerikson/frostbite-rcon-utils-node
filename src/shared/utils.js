/* @flow */
import type Packet from './Packet';
export const DEFAULT_HEADER_SIZE = 12;

/**
 * Calculate the size of a packet.
 * @param {Packet} packet - The packet to calculate the size of.
 */
export function calculatePacketSize(packet: Packet): number {
  let size = DEFAULT_HEADER_SIZE;
  packet.data.forEach((dataItem) => {
    size += dataItem.toString().length + 5;
  });
  return size;
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
  data: [string, number, boolean]): Packet {
  const packet = {
    sequence: sequence,
    isFromServer: isFromServer,
    isResponse: isResponse,
    totalWords: data.length,
    data: data,
  };
  packet.size = calculatePacketSize(packet);
  return packet;
}
