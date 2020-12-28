/**
 * Set of methods used to encrypt and decrypt the data, all operating on base 64
 * TODO: remove redundant conversions for more direct mappings.
 */

import { Store, TNode, denormalizeRoot, normalizeRoot } from "./normalization";
import {
  arraybuffer2base64UTF16,
  arraybuffer2base64UTF8,
  arraybuffer2stringUTF16,
  base642arraybufferUTF16,
  base642arraybufferUTF8,
  string2arraybufferUTF16,
} from "./data-manipulation";
import { useEffect, useState } from "react";

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

export function isKeyValid(key: string): boolean {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(key) && key.length === 44;
}

export function useDataAsStore(
  decodedData: string | null,
  overrides: {
    title?: string;
  },
): {
  store: Store;
  updateNodes: (nodes: TNode[]) => void;
} | null {
  const [store, setStore] = useState<Store | null>(null);
  const { title } = overrides;
  useEffect(() => {
    if (decodedData === null) {
      return;
    }
    setStore(normalizeRoot(decodedData, { title }));
  }, [decodedData, title]);

  if (store === null) {
    return null;
  }

  return {
    store,
    updateNodes: (nodes: TNode[]) => {
      const newNodes = { ...store.nodes };
      nodes.forEach((node) => (newNodes[node.key] = node));
      const newStore = {
        rootNode: {
          ...store.rootNode,
          updated: new Date(),
        },
        nodes: newNodes,
      };
      setStore(newStore);
    },
  };
}

export function useDataDecryption(initialData: string, encryptionKey: string) {
  const [decryptedData, setDecryptedData] = useState<string | null>(null);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  useEffect(() => {
    const isDecryptedAlready = initialData[0] === "{";
    if (isDecryptedAlready) {
      setDecryptedData(initialData);
      setHasFailed(false);
    } else {
      decrypt(initialData, encryptionKey)
        .then((data) => {
          setDecryptedData(data);
          setHasFailed(false);
        })
        .catch(() => {
          setHasFailed(true);
          setDecryptedData("{}");
        });
    }
  }, [initialData, encryptionKey]);
  return { decryptedData, hasFailed };
}

export function useDataEncryption(store: Store, encryptionKey: string) {
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  useEffect(() => {
    encryptData(store, encryptionKey, setEncryptedData);
  }, [store, encryptionKey]);
  return encryptedData;
}

export function encryptData(
  store: Store,
  encryptionKey: string,
  onComplete: (encryptedData: string) => void,
) {
  const plainText = denormalizeRoot(store);
  encrypt(plainText, encryptionKey).then(onComplete);
}
