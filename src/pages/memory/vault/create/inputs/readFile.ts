export default function readFile(
  file: File | null | undefined,
  onDone: (reuslt: string) => void,
) {
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    if (typeof reader.result === "string") {
      onDone(reader.result);
    }
  };
  reader.readAsText(file);
}
