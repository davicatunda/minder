import { Store } from "../utils/normalization";
import { encryptData } from "../utils/encryption";

export default function updateFileContent(
  store: Store,
  encryptionKey: string,
  fileId: string,
  onComplete?: () => void,
) {
  encryptData(store, encryptionKey, (encryptedData) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      onComplete && onComplete();
    };

    xhr.open(
      "PATCH",
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    );
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + gapi.auth.getToken().access_token,
    );
    xhr.send(encryptedData);
  });
}
