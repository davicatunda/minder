// @flow

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';

import FileInput from './components/FileInput';
import DownloadButton from './components/DownloadButton';
import Button from './components/Button';
import DataAsList from './row-items/DataAsList';
import CreateIcon from './icons/CreateIcon';

import { createKey, encrypt, decrypt } from './utils/encryption';

const INITIAL_DATA = `{
  "boolean": true,
  "text": "text",
  "number": 10,
  "array": [
    "zero",
    "first",
    "second",
    "third",
    "forth"
  ],
  "null": null,
  "object2": {
    "string": "test",
    "null": null
  },
  "object": {
    "prop": false
  }
}`;

function App(): Node {
  const [key, setKey] = useState(null);

  // TODO deactive behavior while encrypting (cursor: progress)
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptedData, setEncryptedData] = useState(null);

  // TODO deactive behavior while decrypting (cursor: progress)
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decodedData, setDecodedData] = useState(null);

  // keep encoded data always decoded
  useEffect(() => {
    if (encryptedData == null || key == null) {
      return;
    }
    setIsDecrypting(true);
    decrypt(encryptedData, key).then((message) => {
      setDecodedData(message);
      setIsDecrypting(false);
    });
  }, [encryptedData, key]);

  // keep encoded file always ready to download
  useEffect(() => {
    if (decodedData == null || key == null) {
      return;
    }
    setIsEncrypting(true);
    encrypt(decodedData, key).then((cypher) => {
      setEncryptedData(cypher);
      setIsEncrypting(false);
    });
  }, [decodedData, key]);

  return (
    <div>
      <div style={{ border: '1px solid black', maxWidth: 500 }}>
        <div>
          <div>
            <h2> Key </h2>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: 'center' }}>
              <Button onClick={() => { createKey().then(setKey); }}>
                <span style={{ display: "flex", marginRight: 8, height: 20, width: 20 }}>
                  <CreateIcon size={20} />
                </span>
                Create Key
              </Button>
              <FileInput
                label="Upload key"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                      setKey(reader.result);
                    }
                  }
                  reader.readAsText(file);
                }}
              />
              <DownloadButton data={key} fileName="key.ish">
                Save key
              </DownloadButton>
            </div>
            <p style={{ paddingLeft: 20 }}>{key}</p>
          </div>

          <div>
            <h2> Data </h2>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: 'center' }}>
              <Button onClick={() => setDecodedData(INITIAL_DATA)}>
                <span style={{ display: "flex", marginRight: 8, height: 20, width: 20 }}>
                  <CreateIcon size={20} />
                </span>
                Create Data
            </Button>
              <FileInput
                label="Upload data"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                      setEncryptedData(reader.result);
                    }
                  }
                  reader.readAsText(file)
                }}
              />
              <DownloadButton data={encryptedData} fileName="data.ish">
                Save Data
              </DownloadButton>
            </div>
          </div>
        </div>
        <div>
          {(decodedData) && (
            <DataAsList
              node={JSON.parse(decodedData)}
              setParentValue={(j) => {
                setDecodedData(JSON.stringify(j));
              }}
            />
          )}
        </div>
      </div>
    </div >
  );
}

export default App;