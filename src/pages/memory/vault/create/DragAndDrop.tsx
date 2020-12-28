import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onDrop(file: File | null | undefined): void;
};
export default function DragAndDrop({ children, onDrop }: Props) {
  return (
    <div
      onDrop={(event) => {
        event.preventDefault();
        onDrop(event.dataTransfer.files[0]);
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {children}
    </div>
  );
}
