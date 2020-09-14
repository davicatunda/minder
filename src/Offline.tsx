// @flow

import React, { useState, useEffect, FunctionComponent } from "react";

import FileInput from "./components/FileInput";
import DownloadButton from "./components/DownloadButton";
import Button from "./components/Button";
import DataAsList from "./row-items/DataAsList";
import CreateIcon from "./icons/CreateIcon";
import { gql, useQuery } from "@apollo/client";

import { createKey, encrypt, decrypt } from "./utils/encryption";
import STANDARD from "./standard.alpha";

type OfflinePageResponse = {
  latestStandard: {
    version: string;
    data: string;
  };
};
const QUERY = gql`
  query OfflinePage {
    latestStandard {
      data
    }
  }
`;

const Offline: FunctionComponent<{}> = () => {
  const { data } = useQuery<OfflinePageResponse>(QUERY);
  const standard = data?.latestStandard.data ?? STANDARD;
  const [key, setKey] = useState<string | null>(null);

  // TODO deactive behavior while encrypting (cursor: progress)
  const [, setIsEncrypting] = useState(false);
  const [encryptedData, setEncryptedData] = useState<string | null>(null);

  // TODO deactive behavior while decrypting (cursor: progress)
  const [, setIsDecrypting] = useState(false);
  const [decodedData, setDecodedData] = useState<string | null>(null);

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
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
          borderRadius: 4,
          padding: 12,
        }}
      >
        <h1>Primary</h1>
        <div>
          <div>
            <h2> Key </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  createKey().then(setKey);
                }}
              >
                <span
                  style={{
                    display: "flex",
                    marginRight: 8,
                    height: 20,
                    width: 20,
                  }}
                >
                  <CreateIcon size={20} />
                </span>
                Create Key
              </Button>
              <FileInput
                label="Upload key"
                onChange={(e) => {
                  const file = e?.target?.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                      setKey(reader.result);
                    }
                  };
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setDecodedData(standard)}>
                <span
                  style={{
                    display: "flex",
                    marginRight: 8,
                    height: 20,
                    width: 20,
                  }}
                >
                  <CreateIcon size={20} />
                </span>
                Create Data
              </Button>
              <FileInput
                label="Upload data"
                onChange={(e) => {
                  const file = e?.target?.files?.[0];
                  if (!file) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                      setEncryptedData(reader.result);
                    }
                  };
                  reader.readAsText(file);
                }}
              />
              <DownloadButton data={encryptedData} fileName="data.ish">
                Save Data
              </DownloadButton>
            </div>
          </div>
        </div>
        <div style={{ margin: 12 }}>
          {decodedData && (
            // @ts-ignore workaround
            <DataAsList
              node={JSON.parse(decodedData)}
              setParentValue={(j) => {
                setDecodedData(JSON.stringify(j));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Offline;
