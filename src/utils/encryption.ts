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

export function useDataEncryptionInSync(
  title: string,
  encryptionKey: string,
  initialData: string,
): {
  store: Store;
  updateNodes: (nodes: TNode[]) => void;
  encryptedData: string;
} | null {
  const isProbablyJson = initialData[0] === "{";

  const initialStore = isProbablyJson
    ? () => normalizeRoot(initialData, { title, encryptionKey })
    : null;
  const [store, setStore] = useState<Store | null>(initialStore);

  // decrypted initial encryption data
  const initialEncryptedData = isProbablyJson ? null : initialData;
  useEffect(() => {
    if (initialEncryptedData == null) {
      return;
    }
    decrypt(initialEncryptedData, encryptionKey).then((message) => {
      setStore(normalizeRoot(message, { title, encryptionKey }));
    });
  }, [initialEncryptedData, encryptionKey, title]);

  // keep store always encrypted
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  useEffect(() => {
    if (store == null) {
      return;
    }
    encrypt(denormalizeRoot(store), encryptionKey).then(setEncryptedData);
  }, [store, encryptionKey]);

  if (store === null || encryptedData === null) {
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
    encryptedData,
  };
}
