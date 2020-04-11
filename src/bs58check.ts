import bs58 from 'bs58';

export default class Bs58Check {
  checksumFn: Function;

  constructor(checksumFn: Function) {
    this.checksumFn = checksumFn;
  }

  encode(payload: any) {
    const checksum = this.checksumFn(payload)

    return bs58.encode(Buffer.concat([
      payload,
      checksum
    ], payload.length + 4))
  }

  decodeRaw(buffer: Buffer): any {
    const payload = buffer.slice(0, -4)
    const checksum = buffer.slice(-4)
    const newChecksum = this.checksumFn(payload)

    if (checksum[0] ^ newChecksum[0] |
        checksum[1] ^ newChecksum[1] |
        checksum[2] ^ newChecksum[2] |
        checksum[3] ^ newChecksum[3]) return

    return payload
  }

  // Decode a bs58-check encoded string to a buffer, no result if checksum is wrong
  decodeUnsafe(string: string): any {
    var buffer = bs58.decodeUnsafe(string)
    if (!buffer) return

    return this.decodeRaw(buffer)
  }

  decode(string: string): any {
    var buffer = bs58.decode(string)
    var payload = this.decodeRaw(buffer)
    if (!payload) throw new Error('Invalid checksum')
    return payload
  }
}
