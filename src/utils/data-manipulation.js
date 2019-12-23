
/**
 * ArrayBuffer to String UTF 16 and 8 helpers
 */
export function arraybuffer2stringUTF16(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export function string2arraybufferUTF16(str: string): ArrayBuffer {
  const bufffer = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(bufffer);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufffer;
}

export function arraybuffer2stringUTF8(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

export function string2arraybufferUTF8(str: string): ArrayBuffer {
  const bufffer = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(bufffer);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufffer;
}

/**
 * Base 64 <-> array buffer UTF 16 and 8
 */
export function arraybuffer2base64UTF8(buf: ArrayBuffer): string {
  return btoaUTF8(arraybuffer2stringUTF8(buf));
}

export function base642arraybufferUTF8(str64: string): ArrayBuffer {
  return string2arraybufferUTF8(atobUTF8(str64));
}

export function arraybuffer2base64UTF16(buf: ArrayBuffer): string {
  return btoaUTF16(arraybuffer2stringUTF16(buf));
}

export function base642arraybufferUTF16(str64: string): ArrayBuffer {
  return string2arraybufferUTF16(atobUTF16(str64));
}

/**
 * Base 64  <-> String UTF 16 and 8
 */

function btoaUTF16(str: string): ArrayBuffer {
  const aUTF16CodeUnits = new Uint16Array(str.length);
  Array.prototype.forEach.call(aUTF16CodeUnits, (_, idx, arr) => {
    arr[idx] = str.charCodeAt(idx);
  });
  return btoa(arraybuffer2stringUTF8(aUTF16CodeUnits.buffer));
}

function atobUTF16(str64: string): string {
  const sBinaryString = atob(str64);
  const aBinaryView = new Uint8Array(sBinaryString.length);
  Array.prototype.forEach.call(aBinaryView, (_, idx, arr) => {
    arr[idx] = sBinaryString.charCodeAt(idx);
  });
  return arraybuffer2stringUTF16(aBinaryView.buffer);
}

function btoaUTF8(str: string): ArrayBuffer {
  const aUTF8CodeUnits = new Uint8Array(str.length);
  Array.prototype.forEach.call(aUTF8CodeUnits, (_, idx, arr) => {
    arr[idx] = str.charCodeAt(idx);
  });
  return btoa(arraybuffer2stringUTF8(aUTF8CodeUnits.buffer));
}

function atobUTF8(str64: string): string {
  const sBinaryString = atob(str64);
  const aBinaryView = new Uint8Array(sBinaryString.length);
  Array.prototype.forEach.call(aBinaryView, (_, idx, arr) => {
    arr[idx] = sBinaryString.charCodeAt(idx);
  });
  return arraybuffer2stringUTF8(aBinaryView.buffer);
}
