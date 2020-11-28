/**
 * Set of methods used to encrypt and decrypt the data, all operating on base 64
 * TODO: remove redundant conversions for more direct mappings.
 */

import { useEffect, useState } from "react";
import {
  string2arraybufferUTF16,
  arraybuffer2stringUTF16,
  arraybuffer2base64UTF8,
  base642arraybufferUTF8,
  arraybuffer2base64UTF16,
  base642arraybufferUTF16,
} from "./data-manipulation";

/**
 * Encrypts the data together with iv on base 64 format
 * @param {string} plainText: plain UTF 16 text
 * @param {string} key: encrypted on base 64 format
 */
export async function encrypt(plainText: string, key: string): Promise<string> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    base642arraybufferUTF16(key),
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const cypher = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    cryptoKey,
    string2arraybufferUTF16(plainText),
  );

  // join iv and message
  return `${arraybuffer2base64UTF8(iv)}!${arraybuffer2base64UTF16(cypher)}`;
}

/**
 * Decrypts the data to plain text
 * @param {string} data: encrypted on base 64 format
 * @param {string} key: encrypted on base 64 format
 */
export async function decrypt(data: string, key: string): Promise<string> {
  // split iv from message
  const [iv, encryptedMessage] = data.split("!");
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    base642arraybufferUTF16(key),
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base642arraybufferUTF8(iv) },
    cryptoKey,
    base642arraybufferUTF16(encryptedMessage),
  );
  return arraybuffer2stringUTF16(decryptedData);
}

/**
 * Creates an unique base 64 key for all encryptions
 */
export async function createKey(): Promise<string> {
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const exportedKey = await window.crypto.subtle.exportKey("raw", key);
  return arraybuffer2base64UTF16(exportedKey);
}

export function useDataEncryptionInSync(
  encryptionKey: string,
  initialData: string,
): {
  decodedData: string | null;
  setDecodedData: (decodedData: string) => void;
  encryptedData: string | null;
  isEncrypting: boolean;
  isDecrypting: boolean;
} {
  const isProbablyJson = initialData[0] === "{";
  const [encryptedData, setEncryptedData] = useState<string | null>(
    isProbablyJson ? null : initialData,
  );
  const [decodedData, setDecodedData] = useState<string | null>(
    isProbablyJson ? initialData : null,
  );
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // keep encoded data always decoded
  useEffect(() => {
    if (encryptedData == null) {
      return;
    }
    setIsDecrypting(true);
    decrypt(encryptedData, encryptionKey).then((message) => {
      setDecodedData(message);
      setIsDecrypting(false);
    });
  }, [encryptedData, encryptionKey]);

  // keep encoded file always ready to download
  useEffect(() => {
    if (decodedData == null) {
      return;
    }
    setIsEncrypting(true);
    encrypt(decodedData, encryptionKey).then((cypher) => {
      setEncryptedData(cypher);
      setIsEncrypting(false);
    });
  }, [decodedData, encryptionKey]);
  return {
    decodedData,
    setDecodedData,
    encryptedData,
    isEncrypting,
    isDecrypting,
  };
}
