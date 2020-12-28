export default function deleteFile(fileId: string) {
  return gapi.client.drive.files.delete({ fileId });
}
