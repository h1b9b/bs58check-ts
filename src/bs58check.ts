import { createHash, BinaryLike } from 'crypto';
import bs58 from 'bs58';

type ChecksumFn = (buffer: BinaryLike) => Buffer;

class Bs58Check {
  checksumFn: ChecksumFn;

  constructor(checksumFn: ChecksumFn) {
    this.checksumFn = checksumFn;
  }

  encode(payload: Buffer): string {
    const checksum = this.checksumFn(payload);

    return bs58.encode(Buffer.concat([
      payload,
      checksum
    ], payload.length + 4));
  }

  decodeRaw(buffer: Buffer): Buffer | undefined {
    const payload = buffer.slice(0, -4);
    const checksum = buffer.slice(-4);
    const newChecksum = this.checksumFn(payload);

    if (checksum[0] ^ newChecksum[0] |
        checksum[1] ^ newChecksum[1] |
        checksum[2] ^ newChecksum[2] |
        checksum[3] ^ newChecksum[3]) return;

    return payload;
  }

  // Decode a bs58-check encoded string to a buffer, no result if checksum is wrong
  decodeUnsafe(string: string): Buffer | undefined {
    const buffer = bs58.decodeUnsafe(string);
    if (!buffer) return;

    return this.decodeRaw(buffer);
  }

  decode(string: string): Buffer {
    const buffer = bs58.decode(string);
    const payload = this.decodeRaw(buffer);
    if (!payload) throw new Error('Invalid checksum');
    return payload;
  }
}

// SHA256(SHA256(buffer))
function sha256x2(buffer: BinaryLike): Buffer {
  const tmp = createHash('sha256').update(buffer).digest();
  return createHash('sha256').update(tmp).digest();
}

const bs58safe = new Bs58Check(sha256x2);

export {
  Bs58Check,
  bs58safe
};
