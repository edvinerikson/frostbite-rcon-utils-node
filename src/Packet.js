/* @flow */
export type Packet = { // eslint-disable-line block-scoped-var
  sequence: number;
  isFromServer: boolean;
  isResponse: boolean;
  size: number;
  totalWords: number;
  words: Array<any>;
};
