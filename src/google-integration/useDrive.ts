import { useState, useCallback, useContext } from "react";
import { GoogleAuthContext } from "./GoogleAuth";

const API = "https://www.googleapis.com/drive/v3";
const UPLOAD = "https://www.googleapis.com/upload/drive/v3";

export interface DriveFile {
  id: string;
  name: string;
  appProperties?: { [P in string]: string };
}

interface UseDriveReturn {
  status: DriveStatus;
  create: (
    name: string,
    content: string,
    encryptionKey: string | null,
  ) => Promise<void>;
  update: (id: string, content: string) => Promise<void>;
  load: (id: string) => Promise<string>;
  deleteFile: (id: string) => Promise<void>;
  listAll: () => Promise<DriveFile[]>;
}

export type DriveStatus =
  | { type: "idle" }
  | { type: "loading"; message: string }
  | { type: "success"; message: string };

export function useDrive(): UseDriveReturn {
  const { getToken } = useContext(GoogleAuthContext);
  const [status, setStatus] = useState<DriveStatus>({ type: "idle" });

  const create = useCallback(
    async (name: string, content: string, encryptionKey: string | null) => {
      setStatus({ type: "loading", message: "Loading Drive…" });
      const token = await getToken();
      setStatus({ type: "loading", message: "Saving to Drive…" });
      const file = await createFile(token, name, content, encryptionKey);
      setStatus({
        type: "success",
        message: `Created → ${file.name}\nid: ${file.id}`,
      });
    },
    [getToken],
  );

  const update = useCallback(
    async (id: string, content: string) => {
      setStatus({ type: "loading", message: "Loading Drive…" });
      const token = await getToken();
      setStatus({ type: "loading", message: "Saving to Drive…" });
      const file = await updateFile(token, id, content);
      setStatus({
        type: "success",
        message: `Updated → ${file.name}\nid: ${file.id}`,
      });
    },
    [getToken],
  );

  const load = useCallback(
    async (id: string): Promise<string | null> => {
      setStatus({ type: "loading", message: "Loading Drive…" });
      const token = await getToken();
      setStatus({ type: "loading", message: "Getting file…" });
      const data = await readFile(token, id);
      setStatus({ type: "success", message: `Loaded → ${id}` });
      return data;
    },
    [getToken],
  );

  const deleteFile = useCallback(
    async (id: string): Promise<void> => {
      setStatus({ type: "loading", message: "Loading Drive…" });
      const token = await getToken();
      setStatus({ type: "loading", message: "Getting file…" });
      await deleteById(token, id);
      setStatus({ type: "success", message: `Deleted → ${id}` });
    },
    [getToken],
  );

  const listAll = useCallback(async (): Promise<DriveFile[]> => {
    setStatus({ type: "loading", message: "Loading Drive…" });
    const token = await getToken();
    setStatus({ type: "loading", message: "Fetching file list…" });
    const files = await listFiles(token);
    setStatus({ type: "success", message: `${files.length} file(s) found` });
    return files;
  }, [getToken]);

  return { status, create, update, deleteFile, load, listAll };
}

async function listFiles(token: string): Promise<DriveFile[]> {
  const params = new URLSearchParams({
    spaces: "appDataFolder",
    fields: "files(id,name,appProperties)",
    pageSize: "100",
  });
  const res = await fetch(`${API}/files?${params}`, {
    headers: bearer(token),
  });
  const data = await res.json();
  return data.files as DriveFile[];
}

async function readFile(token: string, fileId: string): Promise<string> {
  const res = await fetch(
    `${API}/files/${encodeURIComponent(fileId)}?alt=media`,
    {
      headers: bearer(token),
    },
  );
  return await res.text();
}

async function createFile(
  token: string,
  name: string,
  data: string,
  encryptionKey: string | null,
): Promise<DriveFile> {
  const form = new FormData();
  const metadata = JSON.stringify({
    name,
    mimeType: "text/plain;charset=base64",
    parents: ["appDataFolder"],
    appProperties: {
      title: name,
      encryptionKey,
    },
  });
  form.append("metadata", new Blob([metadata], { type: "application/json" }));
  form.append("file", new Blob([data], { type: "text/plain;charset=base64" }));
  const res = await fetch(
    `${UPLOAD}/files?uploadType=multipart&fields=id,name,appProperties`,
    {
      method: "POST",
      headers: bearer(token),
      body: form,
    },
  );
  return await (res.json() as Promise<DriveFile>);
}

async function updateFile(
  token: string,
  fileId: string,
  data: string,
): Promise<DriveFile> {
  const params = new URLSearchParams({
    uploadType: "media",
    fields: "id,name,appProperties",
  });
  const res = await fetch(
    `${UPLOAD}/files/${encodeURIComponent(fileId)}?${params}`,
    {
      method: "PATCH",
      headers: { ...bearer(token), "Content-Type": "text/plain" },
      body: data,
    },
  );
  return await (res.json() as Promise<DriveFile>);
}

function deleteById(token: string, fileId: string): Promise<Response> {
  return fetch(`${API}/files/${encodeURIComponent(fileId)}`, {
    method: "DELETE",
    headers: bearer(token),
  });
}

function bearer(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}
