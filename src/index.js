import { encodePacket } from './shared/encoder';
import { decodePacket } from './shared/decoder';

import configureClient from './client';
import configureServer from './server';

export * from './shared/utils';

export {
  encodePacket,
  decodePacket,
  configureClient,
  configureServer
};
