import { createHash } from "crypto";
import Bs58Safe from './bs58safe';

// SHA256(SHA256(buffer))
function sha256x2 (buffer: any): Buffer {
  const tmp = createHash('sha256').update(buffer).digest();
  return createHash('sha256').update(tmp).digest();
}

export default new Bs58Safe(sha256x2);