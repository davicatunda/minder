import { Store } from "../utils/normalization";
import { encryptData } from "../utils/encryption";

export default function uploadFile(
  store: Store,
  encryptionKey: string,
  config: { withKey: boolean },
  onComplete?: () => void,
) {
  encryptData(store, encryptionKey, (encryptedData) => {
    const form = new FormData();
    form.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            name: store.rootNode.title,
            mimeType: "text/plain;charset=base64",
            parents: ["appDataFolder"],
            appProperties: {
              title: store.rootNode.title,
              encryptionKey: config.withKey ? encryptionKey : undefined,
            },
          }),
        ],
        { type: "application/json" },
      ),
    );
    form.append("file", new Blob([encryptedData], { type: "text/plain" }));
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      onComplete && onComplete();
    };

    xhr.open(
      "POST",
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    );
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + gapi.auth.getToken().access_token,
    );
    xhr.responseType = "json";
    xhr.send(form);
  });
}
