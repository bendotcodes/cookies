import { ArrayBuffer, TextDecoder, TextEncoder, Uint8Array } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ArrayBuffer = ArrayBuffer;
global.Uint8Array = Uint8Array;

global.IS_REACT_ACT_ENVIRONMENT = true;
