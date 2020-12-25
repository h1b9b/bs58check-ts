import { bs58safe } from '../bs58check';
import { valid, invalid } from './fixtures.json';

/**
 * bs58safe encode and decode tests 
 */
describe('Base58 check', () => {
  describe('decode', () => {
    it('decode string to hex', () => {
      valid.forEach(({ string, payload }: { string: string, payload: string}) => {
        expect(bs58safe.decode(string).toString('hex')).toBe(payload);
      }); 
    });

    it('unsafely decode string to hex', () => {
      valid.forEach(({ string, payload }: { string: string, payload: string}) => {
        expect(bs58safe.decodeUnsafe(string)?.toString('hex')).toBe(payload);
      });
    });

    it('throw error when decoding wrong string to hex', () => {
      invalid.forEach(({ string, exception }: { string: string, exception: string }) => {
        expect(() => bs58safe.decode(string)).toThrow(exception);
      });
    });

    it('return undefined when unsafely wrong string to hex', () => {
      invalid.forEach(({ string }: { string: string }) => {
        expect(bs58safe.decodeUnsafe(string)).toBe(undefined);
      });
    });
  });

  describe('encode', () => {
    it('encode string to hex', () => {
      valid.forEach(({ string, payload }: { string: string, payload: string }) => {
        expect(bs58safe.encode(Buffer.from(payload, 'hex'))).toBe(string);
      });
    });
  });
});
